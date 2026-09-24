import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider with requested Workspace Scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/forms.body');
provider.setCustomParameters({
  prompt: 'consent',
  access_type: 'offline'
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Auth State Listener with in-memory token cache
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Não foi possível obter o token de acesso do Google.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Erro na autenticação com Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Types for Drive structure
export interface DriveFolderRef {
  id: string;
  name: string;
  webViewLink?: string;
}

export interface SheetRef {
  id: string;
  name: string;
  spreadsheetUrl?: string;
}

export interface FormRef {
  id: string;
  title: string;
  responderUri?: string;
  editUrl?: string;
}

export interface RegionalDriveStructure {
  mainFolder: DriveFolderRef;
  tatuape: {
    folder: DriveFolderRef;
    sheet: SheetRef;
    form?: FormRef;
  };
  mooca: {
    folder: DriveFolderRef;
    sheet: SheetRef;
    form?: FormRef;
  };
  vilaEma: {
    folder: DriveFolderRef;
    sheet: SheetRef;
    form?: FormRef;
  };
}

/**
 * Creates or retrieves a folder in Google Drive
 */
async function getOrCreateFolder(
  token: string,
  folderName: string,
  parentId?: string
): Promise<DriveFolderRef> {
  let query = `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  if (parentId) {
    query += ` and '${parentId}' in parents`;
  }

  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!searchRes.ok) {
    throw new Error(`Erro ao buscar pasta "${folderName}" no Drive`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0];
  }

  // Create folder
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder'
  };
  if (parentId) {
    metadata.parents = [parentId];
  }

  const createRes = await fetch(
    'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metadata)
    }
  );

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Erro ao criar pasta "${folderName}": ${err}`);
  }

  return await createRes.json();
}

/**
 * Creates or retrieves a Google Sheet in a specific folder with headers: | Data | Nome | E-mail | Telefone |
 */
async function getOrCreateSheetInFolder(
  token: string,
  sheetName: string,
  parentFolderId: string
): Promise<SheetRef> {
  const query = `name = '${sheetName}' and mimeType = 'application/vnd.google-apps.spreadsheet' and '${parentFolderId}' in parents and trashed = false`;
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      const existing = searchData.files[0];
      return {
        id: existing.id,
        name: existing.name,
        spreadsheetUrl: existing.webViewLink || `https://docs.google.com/spreadsheets/d/${existing.id}/edit`
      };
    }
  }

  // Create empty spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: sheetName
      }
    })
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Erro ao criar planilha "${sheetName}": ${err}`);
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;

  // Move sheet into the designated folder
  await fetch(
    `https://www.googleapis.com/drive/v3/files/${spreadsheetId}?addParents=${parentFolderId}&fields=id,parents`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  // Initialize the exact columns required: | Data | Nome | E-mail | Telefone |
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:D1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [['Data', 'Nome', 'E-mail', 'Telefone']]
      })
    }
  );

  return {
    id: spreadsheetId,
    name: sheetName,
    spreadsheetUrl: sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
  };
}

/**
 * Creates Google Forms for the region
 */
async function getOrCreateGoogleForm(
  token: string,
  formTitle: string,
  parentFolderId: string
): Promise<FormRef> {
  const query = `name = '${formTitle}' and mimeType = 'application/vnd.google-apps.form' and '${parentFolderId}' in parents and trashed = false`;
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,webViewLink)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      const f = data.files[0];
      return {
        id: f.id,
        title: f.name,
        responderUri: `https://docs.google.com/forms/d/e/${f.id}/viewform`,
        editUrl: f.webViewLink || `https://docs.google.com/forms/d/${f.id}/edit`
      };
    }
  }

  // Create form via Google Forms API
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: formTitle,
        documentTitle: formTitle
      }
    })
  });

  if (!createRes.ok) {
    return {
      id: '',
      title: formTitle,
      editUrl: '#'
    };
  }

  const formData = await createRes.json();
  const formId = formData.formId;

  // Move form into the region's folder
  await fetch(
    `https://www.googleapis.com/drive/v3/files/${formId}?addParents=${parentFolderId}&fields=id,parents`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  // Add questions: Nome, E-mail, Telefone
  try {
    await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          {
            createItem: {
              item: {
                title: 'Nome',
                questionItem: { question: { required: true, textQuestion: {} } }
              },
              location: { index: 0 }
            }
          },
          {
            createItem: {
              item: {
                title: 'E-mail',
                questionItem: { question: { required: true, textQuestion: {} } }
              },
              location: { index: 1 }
            }
          },
          {
            createItem: {
              item: {
                title: 'Telefone',
                questionItem: { question: { required: true, textQuestion: {} } }
              },
              location: { index: 2 }
            }
          }
        ]
      })
    });
  } catch (e) {
    console.warn('Questions batchUpdate skipped:', e);
  }

  return {
    id: formId,
    title: formTitle,
    responderUri: formData.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`,
    editUrl: `https://docs.google.com/forms/d/${formId}/edit`
  };
}

/**
 * Builds the entire structure requested by user:
 * Main: "LEADS — APARTAMENTOS"
 * Subfolders:
 *  - TATUAPÉ -> Formulário Tatuapé & Planilha Leads Tatuapé
 *  - MOOCA -> Formulário Mooca & Planilha Leads Mooca
 *  - VILA EMA -> Formulário Vila Ema & Planilha Leads Vila Ema
 */
export async function setupCompleteDriveStructure(): Promise<RegionalDriveStructure> {
  const token = await getAccessToken();
  if (!token) throw new Error('Usuário não autenticado no Google');

  // 1. Main Folder: "LEADS — APARTAMENTOS"
  const mainFolder = await getOrCreateFolder(token, 'LEADS — APARTAMENTOS');

  // 2. Subfolder: TATUAPÉ
  const tatuapeFolder = await getOrCreateFolder(token, 'TATUAPÉ', mainFolder.id);
  const tatuapeSheet = await getOrCreateSheetInFolder(token, 'Planilha Leads Tatuapé', tatuapeFolder.id);
  const tatuapeForm = await getOrCreateGoogleForm(token, 'Interesse em Apartamentos no Tatuapé', tatuapeFolder.id);

  // 3. Subfolder: MOOCA
  const moocaFolder = await getOrCreateFolder(token, 'MOOCA', mainFolder.id);
  const moocaSheet = await getOrCreateSheetInFolder(token, 'Planilha Leads Mooca', moocaFolder.id);
  const moocaForm = await getOrCreateGoogleForm(token, 'Interesse em Apartamentos na Mooca', moocaFolder.id);

  // 4. Subfolder: VILA EMA
  const vilaEmaFolder = await getOrCreateFolder(token, 'VILA EMA', mainFolder.id);
  const vilaEmaSheet = await getOrCreateSheetInFolder(token, 'Planilha Leads Vila Ema', vilaEmaFolder.id);
  const vilaEmaForm = await getOrCreateGoogleForm(token, 'Interesse em Apartamentos na Vila Ema', vilaEmaFolder.id);

  return {
    mainFolder,
    tatuape: { folder: tatuapeFolder, sheet: tatuapeSheet, form: tatuapeForm },
    mooca: { folder: moocaFolder, sheet: moocaSheet, form: moocaForm },
    vilaEma: { folder: vilaEmaFolder, sheet: vilaEmaSheet, form: vilaEmaForm }
  };
}

/**
 * Appends a lead row to the respective region's Google Sheet:
 * Row: [Data/Hora, Nome, E-mail, Telefone]
 */
export async function appendLeadToSheet(
  spreadsheetId: string,
  lead: { name: string; email: string; phone: string }
): Promise<boolean> {
  const token = await getAccessToken();
  if (!token || !spreadsheetId) return false;

  const now = new Date();
  const formattedDate = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:D1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [[formattedDate, lead.name, lead.email, lead.phone]]
      })
    }
  );

  return res.ok;
}
