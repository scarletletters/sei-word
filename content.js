// Adiciona o botão de exportação para Word no menu do SEI
function adicionarBotaoExportarWord() {
  if (document.getElementById('btnExportarWordSEI')) return;
  const barraAcoes = document.querySelector('#divArvoreAcoes');
  if (!barraAcoes) return;
  const iconUrl = chrome.runtime.getURL('icons/microsoft-word-icon.png');
  const link = document.createElement('a');
  link.id = 'btnExportarWordSEI';
  link.title = 'Exportar para Word';
  link.href = '#';
  link.tabIndex = 451;
  link.onmouseover = () => window.infraTooltipMostrar && window.infraTooltipMostrar('Exportar para Word');
  link.onmouseout = () => window.infraTooltipOcultar && window.infraTooltipOcultar();
  link.onclick = (e) => { e.preventDefault(); exportarParaWord(); };
  link.innerHTML = `<img src="${iconUrl}" alt="Exportar para Word" style="width:40px; height:40px;" />`;
  barraAcoes.appendChild(link);
}

// Exporta o conteúdo do iframe para um arquivo Word (.docx)
async function exportarParaWord() {
  try {
    const iframe = document.getElementById('ifrVisualizacao');
    if (!iframe) throw new Error('iframe de visualização não encontrado');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (!iframeDoc || !iframeDoc.body) throw new Error('Conteúdo do iframe não encontrado');

    const htmlContent = iframeDoc.body.innerHTML;
    let fileName = 'Documento_SEI';
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    fileName = `${fileName}_${dateStr}`;

    const styledHtml = `<!DOCTYPE html><html><head><meta charset='UTF-8'>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin: 0; }
        .wrapper { box-sizing: border-box; }
        p, div, span { font-family: 'Times New Roman', Times, serif !important; font-size: 12pt !important; text-align: justify; line-height: 1.5; margin-bottom: 0; }
        table { border-collapse: collapse; width: 100%; table-layout: fixed; font-family: 'Times New Roman', Times, serif; font-size: 10pt; }
        td, th { border: 0.5pt solid #000; padding: 2pt 2pt; font-family: 'Times New Roman', Times, serif; font-size: 10pt; word-break: break-all; overflow-wrap: break-word; white-space: normal; }
        img { max-width: 100%; height: auto; }
      </style>
    </head><body><div class="wrapper">${htmlContent}</div></body></html>`;

    const blob = htmlDocx.asBlob(styledHtml);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro na exportação para Word:', error);
  }
}

// Observa a criação do menu para inserir o botão Word
const observer = new MutationObserver(adicionarBotaoExportarWord);
observer.observe(document.body, { childList: true, subtree: true });

// Garante a inserção do botão ao carregar a página
window.addEventListener('DOMContentLoaded', adicionarBotaoExportarWord);

// Listener para mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'exportToWord' || request.action === 'convertToDOCX') {
    exportarParaWord().then(() => sendResponse({ success: true })).catch(() => sendResponse({ success: false }));
    return true;
  }
}); 