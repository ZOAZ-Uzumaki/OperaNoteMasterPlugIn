// Функція для отримання всіх заголовків h1 на сторінці
function getH1Headers() {
  const h1Headers = document.querySelectorAll('h1');
  const headersText = Array.from(h1Headers).map((header) => header.innerText);
  return headersText;
}

// Функція для збереження тексту заголовків у файл
function saveHeadersToFile(headers) {
  const headersText = headers.join('\n');
  const blob = new Blob([headersText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  // Створюємо посилання на файл та спонукаємо користувача завантажити його
  const a = document.createElement('a');
  a.href = url;
  a.download = 'headers.txt';
  a.click();

  // Звільняємо ресурси
  URL.revokeObjectURL(url);

  // Сповіщення користувача про успішне збереження
  alert('Заголовки H1 успішно збережені у файл headers.txt');
}

// Створюємо контекстне меню
chrome.contextMenus.create({
  id: 'showHeaders',
  title: 'Показати H1 Заголовки',
  contexts: ['all'],
});

// Обробник кліку на контекстне меню
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === 'showHeaders') {
    const headers = getH1Headers();
    const headersText = headers.join('\n');
    const newTabUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent(headersText);
    chrome.tabs.create({ url: newTabUrl });
  }
});

// Обробник кліку на іконку розширення
chrome.browserAction.onClicked.addListener(function (tab) {
  const headers = getH1Headers();
  saveHeadersToFile(headers);
});
