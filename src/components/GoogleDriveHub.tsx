import React, { useState } from 'react';
import {
  Folder,
  FileSpreadsheet,
  FileText,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Code,
  Download,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import {
  googleSignIn,
  logoutGoogle,
  setupCompleteDriveStructure,
  RegionalDriveStructure
} from '../services/googleWorkspace';
import { User } from 'firebase/auth';
import { GOOGLE_APPS_SCRIPT_CODE } from '../data/googleAppsScriptCode';
import { RegionalLeadRecord } from './RegionalLeadForms';

interface GoogleDriveHubProps {
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
  driveStructure: RegionalDriveStructure | null;
  onStructureChange: (structure: RegionalDriveStructure | null) => void;
  leads: RegionalLeadRecord[];
  onOpenFormForRegion: (region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA') => void;
}

export const GoogleDriveHub: React.FC<GoogleDriveHubProps> = ({
  currentUser,
  onUserChange,
  driveStructure,
  onStructureChange,
  leads,
  onOpenFormForRegion
}) => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [selectedSheetView, setSelectedSheetView] = useState<'TATUAPÉ' | 'MOOCA' | 'VILA EMA'>('TATUAPÉ');

  // Filter leads for the currently selected sheet tab
  const filteredLeads = leads.filter((l) => l.region === selectedSheetView);

  const handleGoogleLogin = async () => {
    setIsAuthorizing(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onUserChange(res.user);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Falha ao autenticar com o Google.');
    } finally {
      setIsAuthorizing(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogle();
    onUserChange(null);
    onStructureChange(null);
  };

  const handleCreateDriveStructure = async () => {
    setIsProvisioning(true);
    setErrorMsg(null);
    try {
      const structure = await setupCompleteDriveStructure();
      onStructureChange(structure);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Falha ao criar pastas e planilhas no Google Drive.');
    } finally {
      setIsProvisioning(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleDownloadCsv = (region: 'TATUAPÉ' | 'MOOCA' | 'VILA EMA') => {
    const regionLeads = leads.filter((l) => l.region === region);
    const headers = 'Data,Nome,E-mail,Telefone\n';
    const rows = regionLeads
      .map((l) => `"${l.timestamp}","${l.name}","${l.email}","${l.phone}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads-${region.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section id="google-drive" className="py-14 sm:py-18 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Drive & Planilhas Automatizadas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Organização: LEADS — APARTAMENTOS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              Cada formulário alimenta automaticamente a respectiva planilha no Google Drive. Você também pode visualizar os dados em tempo real ou exportar para CSV.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowScriptModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
            >
              <Code className="w-4 h-4 text-amber-400" />
              <span>Ver Google Apps Script</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-200">{currentUser.displayName || currentUser.email}</p>
                  <p className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Google Conectado
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-300 text-xs border border-slate-700 transition-colors"
                >
                  Desconectar
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={isAuthorizing}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isAuthorizing ? 'Conectando...' : 'Conectar com Google'}</span>
              </button>
            )}
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Drive Folders Architecture Cards */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card TATUAPÉ */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">📁 TATUAPÉ</h3>
                  <p className="text-[11px] text-slate-400">LEADS — APARTAMENTOS / TATUAPÉ</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-amber-300">
                {leads.filter((l) => l.region === 'TATUAPÉ').length} Leads
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">Formulário Tatuapé</span>
                </div>
                {driveStructure?.tatuape.form?.responderUri ? (
                  <a
                    href={driveStructure.tatuape.form.responderUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenFormForRegion('TATUAPÉ')}
                    className="text-slate-400 hover:text-amber-300 text-[11px] font-bold"
                  >
                    Preencher
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Planilha Leads Tatuapé</span>
                </div>
                {driveStructure?.tatuape.sheet?.spreadsheetUrl ? (
                  <a
                    href={driveStructure.tatuape.sheet.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Abrir Sheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500">Auto-sincronizada</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onOpenFormForRegion('TATUAPÉ')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold"
              >
                Abrir Formulário Tatuapé →
              </button>
              <button
                onClick={() => handleDownloadCsv('TATUAPÉ')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                title="Baixar CSV Tatuapé"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card MOOCA */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">📁 MOOCA</h3>
                  <p className="text-[11px] text-slate-400">LEADS — APARTAMENTOS / MOOCA</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-amber-300">
                {leads.filter((l) => l.region === 'MOOCA').length} Leads
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">Formulário Mooca</span>
                </div>
                {driveStructure?.mooca.form?.responderUri ? (
                  <a
                    href={driveStructure.mooca.form.responderUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenFormForRegion('MOOCA')}
                    className="text-slate-400 hover:text-amber-300 text-[11px] font-bold"
                  >
                    Preencher
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Planilha Leads Mooca</span>
                </div>
                {driveStructure?.mooca.sheet?.spreadsheetUrl ? (
                  <a
                    href={driveStructure.mooca.sheet.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Abrir Sheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500">Auto-sincronizada</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onOpenFormForRegion('MOOCA')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold"
              >
                Abrir Formulário Mooca →
              </button>
              <button
                onClick={() => handleDownloadCsv('MOOCA')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                title="Baixar CSV Mooca"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card VILA EMA */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">📁 VILA EMA</h3>
                  <p className="text-[11px] text-slate-400">LEADS — APARTAMENTOS / VILA EMA</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 text-amber-300">
                {leads.filter((l) => l.region === 'VILA EMA').length} Leads
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">Formulário Vila Ema</span>
                </div>
                {driveStructure?.vilaEma.form?.responderUri ? (
                  <a
                    href={driveStructure.vilaEma.form.responderUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Abrir</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenFormForRegion('VILA EMA')}
                    className="text-slate-400 hover:text-amber-300 text-[11px] font-bold"
                  >
                    Preencher
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Planilha Leads Vila Ema</span>
                </div>
                {driveStructure?.vilaEma.sheet?.spreadsheetUrl ? (
                  <a
                    href={driveStructure.vilaEma.sheet.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-bold text-[11px]"
                  >
                    <span>Abrir Sheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-500">Auto-sincronizada</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => onOpenFormForRegion('VILA EMA')}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold"
              >
                Abrir Formulário Vila Ema →
              </button>
              <button
                onClick={() => handleDownloadCsv('VILA EMA')}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                title="Baixar CSV Vila Ema"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action button to create folder structure in Drive */}
        <div className="mt-8 bg-slate-800/40 p-5 rounded-2xl border border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-sm text-white">Sincronização Direta com o Google Drive</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Crie a pasta principal "LEADS — APARTAMENTOS" e as planilhas oficiais com apenas 1 clique em sua conta Google.
            </p>
          </div>

          <button
            onClick={currentUser ? handleCreateDriveStructure : handleGoogleLogin}
            disabled={isProvisioning || isAuthorizing}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isProvisioning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Criando no Google Drive...</span>
              </>
            ) : driveStructure ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Pastas Criadas no Drive</span>
              </>
            ) : (
              <>
                <FolderOpen className="w-4 h-4" />
                <span>{currentUser ? 'Criar Pastas e Planilhas no Drive' : 'Conectar e Criar no Drive'}</span>
              </>
            )}
          </button>
        </div>

        {/* Live Regional Leads Spreadsheet Viewer: | Data | Nome | E-mail | Telefone | */}
        <div className="mt-10 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  Visualização da Planilha: {selectedSheetView === 'TATUAPÉ' ? 'Planilha Leads Tatuapé' : selectedSheetView === 'MOOCA' ? 'Planilha Leads Mooca' : 'Planilha Leads Vila Ema'}
                </h4>
                <p className="text-[11px] text-slate-400">Estrutura oficial: | Data | Nome | E-mail | Telefone |</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {(['TATUAPÉ', 'MOOCA', 'VILA EMA'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedSheetView(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedSheetView === r
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}

              <button
                onClick={() => handleDownloadCsv(selectedSheetView)}
                className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-colors"
                title="Exportar CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/80 text-slate-300 font-bold border-b border-slate-800">
                  <th className="py-3 px-4 w-44">Data</th>
                  <th className="py-3 px-4">Nome</th>
                  <th className="py-3 px-4">E-mail</th>
                  <th className="py-3 px-4">Telefone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-sans">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{lead.timestamp}</td>
                      <td className="py-3 px-4 text-white font-semibold">{lead.name}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">{lead.email}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono text-[11px]">{lead.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Nenhum lead recebido ainda para {selectedSheetView}. Preencha o formulário acima para testar!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Google Apps Script Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-amber-400" />
                  <span>Código de Automação Google Apps Script</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Código pronto para executar diretamente no Google Drive (script.google.com).
                </p>
              </div>

              <button
                onClick={() => setShowScriptModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-amber-300 space-y-1">
                <p className="font-bold">Como utilizar este script:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-300">
                  <li>Acesse <strong>script.google.com</strong> com sua conta Google.</li>
                  <li>Clique em <strong>Novo projeto</strong> e cole o código abaixo.</li>
                  <li>Clique no botão <strong>Executar</strong> na função <code>setupLeadsSystem</code>.</li>
                  <li>O script cria automaticamente a pasta <strong>LEADS — APARTAMENTOS</strong> com as 3 pastas e planilhas!</li>
                </ol>
              </div>

              <div className="relative">
                <button
                  onClick={handleCopyScript}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Copiado!' : 'Copiar Código'}</span>
                </button>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] overflow-x-auto max-h-96">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowScriptModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
