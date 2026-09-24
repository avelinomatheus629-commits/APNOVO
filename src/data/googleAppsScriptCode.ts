export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * GOOGLE APPS SCRIPT: SISTEMA DE CAPTAÇÃO DE LEADS ZONA LESTE
 * 
 * Este script automatiza o Google Drive, criando a estrutura solicitada:
 * Pasta Principal: "LEADS — APARTAMENTOS"
 * Pastas Filhas:
 *   📁 TATUAPÉ -> Formulário Tatuapé & Planilha Leads Tatuapé
 *   📁 MOOCA -> Formulário Mooca & Planilha Leads Mooca
 *   📁 VILA EMA -> Formulário Vila Ema & Planilha Leads Vila Ema
 *
 * Colunas das planilhas: | Data | Nome | E-mail | Telefone |
 */

function setupLeadsSystem() {
  Logger.log('Iniciando criação da estrutura no Google Drive...');
  
  // 1. Criar pasta principal
  var mainFolderName = 'LEADS — APARTAMENTOS';
  var mainFolders = DriveApp.getFoldersByName(mainFolderName);
  var mainFolder = mainFolders.hasNext() ? mainFolders.next() : DriveApp.createFolder(mainFolderName);
  
  var regions = [
    {
      name: 'TATUAPÉ',
      formTitle: 'Interesse em Apartamentos no Tatuapé',
      sheetTitle: 'Planilha Leads Tatuapé'
    },
    {
      name: 'MOOCA',
      formTitle: 'Interesse em Apartamentos na Mooca',
      sheetTitle: 'Planilha Leads Mooca'
    },
    {
      name: 'VILA EMA',
      formTitle: 'Interesse em Apartamentos na Vila Ema',
      sheetTitle: 'Planilha Leads Vila Ema'
    }
  ];

  var result = {};

  regions.forEach(function(region) {
    // Criar subpasta da região
    var subFolders = mainFolder.getFoldersByName(region.name);
    var subFolder = subFolders.hasNext() ? subFolders.next() : mainFolder.createFolder(region.name);
    
    // Criar Planilha com as colunas: | Data | Nome | E-mail | Telefone |
    var sheetFiles = subFolder.getFilesByName(region.sheetTitle);
    var spreadsheet;
    if (sheetFiles.hasNext()) {
      var file = sheetFiles.next();
      spreadsheet = SpreadsheetApp.openById(file.getId());
    } else {
      spreadsheet = SpreadsheetApp.create(region.sheetTitle);
      var file = DriveApp.getFileById(spreadsheet.getId());
      file.moveTo(subFolder);
      
      // Configurar cabeçalho na primeira linha
      var sheet = spreadsheet.getActiveSheet();
      sheet.appendRow(['Data', 'Nome', 'E-mail', 'Telefone']);
      sheet.getRange('A1:D1').setFontWeight('bold').setBackground('#f1f5f9');
    }

    // Criar Formulário Google com perguntas obrigatórias
    var formFiles = subFolder.getFilesByName(region.formTitle);
    var form;
    if (formFiles.hasNext()) {
      form = FormApp.openById(formFiles.next().getId());
    } else {
      form = FormApp.create(region.formTitle);
      var formFile = DriveApp.getFileById(form.getId());
      formFile.moveTo(subFolder);

      // Adicionar campos obrigatórios
      form.addTextItem().setTitle('Nome').setRequired(true);
      form.addTextItem().setTitle('E-mail').setRequired(true);
      form.addTextItem().setTitle('Telefone').setRequired(true);

      // Vincular respostas do formulário diretamente à planilha criada
      form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
    }

    result[region.name] = {
      pasta: subFolder.getUrl(),
      planilha: spreadsheet.getUrl(),
      formulario: form.getPublishedUrl()
    };
  });

  Logger.log('Estrutura configurada com sucesso: ' + JSON.stringify(result, null, 2));
  return result;
}

// Webhook para receber leads via POST diretamente da aplicação web:
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var region = (data.region || '').toUpperCase();
    var name = data.name || '';
    var email = data.email || '';
    var phone = data.phone || '';
    
    var timestamp = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
    
    var mainFolder = DriveApp.getFoldersByName('LEADS — APARTAMENTOS').next();
    var subFolder = mainFolder.getFoldersByName(region).next();
    var sheetTitle = 'Planilha Leads ' + (region.charAt(0) + region.slice(1).toLowerCase());
    var sheetFile = subFolder.getFilesByName(sheetTitle).next();
    var ss = SpreadsheetApp.openById(sheetFile.getId());
    
    // Inserir linha: [Data, Nome, E-mail, Telefone]
    ss.getActiveSheet().appendRow([timestamp, name, email, phone]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Lead registrado' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
