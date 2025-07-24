function getCurrentDrawDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  if (date >= 16) {
    return new Date(year, month, 16);
  } else {
    return new Date(year, month, 1);
  }
}

function getNextDrawDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let nextDate;
  if (day === 1) {
    nextDate = new Date(year, month, 16);
  } else {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    nextDate = new Date(nextYear, nextMonth, 1);
  }
  return nextDate;
}

function formatDate(date) {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

let currentDrawDate = getCurrentDrawDate();

function drawNumbers() {
  const twoDigit = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const threeDigit = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const fourDigit = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  document.getElementById('twoDigit').innerText = twoDigit;
  document.getElementById('threeDigit').innerText = threeDigit;
  document.getElementById('fourDigit').innerText = fourDigit;

  const formattedDate = formatDate(currentDrawDate);
  const nextDate = formatDate(getNextDrawDate(currentDrawDate));
  document.getElementById('drawDate').innerText = formattedDate;
  document.getElementById('nextDraw').innerText = 'งวดถัดไป: ' + nextDate;

  const historyRow = `
    <tr>
      <td>${formattedDate}</td>
      <td>${twoDigit}</td>
      <td>${threeDigit}</td>
      <td>${fourDigit}</td>
    </tr>
  `;
  document.getElementById('historyTable').innerHTML =
    historyRow + document.getElementById('historyTable').innerHTML;

  currentDrawDate = getNextDrawDate(currentDrawDate);
}