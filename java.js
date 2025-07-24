function formatDate(date) {
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCurrentDrawDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  const drawDay = date >= 16 ? 16 : 1;
  return new Date(year, month, drawDay);
}

function getNextDrawDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (day === 1) {
    return new Date(year, month, 16);
  } else {
    return new Date(month === 11 ? year + 1 : year, (month + 1) % 12, 1);
  }
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

  document.getElementById('historyTable').innerHTML = historyRow + document.getElementById('historyTable').innerHTML;

  checkWin(twoDigit, threeDigit, fourDigit);

  currentDrawDate = getNextDrawDate(currentDrawDate);
}

function checkWin(two, three, four) {
  const buyTwo = document.getElementById('buyTwo').value.trim().padStart(2, '0');
  const buyThree = document.getElementById('buyThree').value.trim().padStart(3, '0');
  const buyFour = document.getElementById('buyFour').value.trim().padStart(4, '0');

  let result = '';

  if (buyTwo && buyTwo === two) {
    result += ถูกเลข 2: ${buyTwo}<br>;
  }
  if (buyThree && buyThree === three) {
    result += ถูกเลข 3: ${buyThree}<br>;
  }
  if (buyFour && buyFour === four) {
    result += ถูกเลข 4 : ${buyFour}<br>;
  }

  if (!result) {
    result = 'ไม่ถูกรางวัล';
  }

  document.getElementById('resultMessage').innerHTML = result;
}