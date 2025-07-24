function formatDateTH(date) {
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function getNextDrawDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  if (day < 16) {
    return new Date(year, month, 16);
  } else {
    return new Date(year, month + 1, 1);
  }
}

function drawRandomDigits(length) {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

function drawNumbers() {
  const two = drawRandomDigits(2);
  const three = drawRandomDigits(3);
  const four = drawRandomDigits(4);

  document.getElementById("twoDigit").textContent = two;
  document.getElementById("threeDigit").textContent = three;
  document.getElementById("fourDigit").textContent = four;

  const today = new Date();
  const drawDate = today.getDate() <= 1 ? new Date(today.getFullYear(), today.getMonth(), 1)
                 : today.getDate() <= 16 ? new Date(today.getFullYear(), today.getMonth(), 16)
                 : new Date(today.getFullYear(), today.getMonth() + 1, 1);

  document.getElementById("drawDate").textContent = formatDateTH(drawDate);
  document.getElementById("nextDraw").textContent = "งวดถัดไป: " + formatDateTH(getNextDrawDate(drawDate));

  updateHistory(drawDate, two, three, four);
}

function updateHistory(date, two, three, four) {
  const table = document.getElementById("historyTable");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${formatDateTH(date)}</td>
    <td>${two}</td>
    <td>${three}</td>
    <td>${four}</td>
  `;
  table.prepend(row);
}

function resetAll() {
  document.getElementById("twoDigit").textContent = "--";
  document.getElementById("threeDigit").textContent = "---";
  document.getElementById("fourDigit").textContent = "----";
  document.getElementById("drawDate").textContent = "";
  document.getElementById("nextDraw").textContent = "";
  document.getElementById("historyTable").innerHTML = "";
}

document.getElementById("drawBtn").addEventListener("click", drawNumbers);
document.getElementById("resetBtn").addEventListener("click", resetAll);