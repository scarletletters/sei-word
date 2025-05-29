document.addEventListener('DOMContentLoaded', function() {
  const convertBtn = document.getElementById('convertBtn');
  const statusDiv = document.getElementById('status');

  convertBtn.addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Exportando...';
    statusDiv.className = 'status';
    statusDiv.style.display = 'block';

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.tabs.sendMessage(tab.id, { action: 'exportToWord' }, (response) => {
        if (response && response.success) {
          statusDiv.textContent = 'Exportação concluída!';
          statusDiv.className = 'status success';
        } else {
          statusDiv.textContent = 'Erro ao exportar o documento.';
          statusDiv.className = 'status error';
        }
      });
    } catch (error) {
      statusDiv.textContent = 'Erro: ' + error.message;
      statusDiv.className = 'status error';
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
  }
}); 