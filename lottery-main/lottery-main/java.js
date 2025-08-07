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
  document.getElementById("resultMsg").textContent = "";
  document.getElementById("buy2").value = "";
  document.getElementById("buy3").value = "";
  document.getElementById("buy4").value = "";
}

document.getElementById("drawBtn").addEventListener("click", drawNumbers);
document.getElementById("resetBtn").addEventListener("click", resetAll);

document.getElementById("buyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const buy2 = document.getElementById("buy2").value.trim();
  const buy3 = document.getElementById("buy3").value.trim();
  const buy4 = document.getElementById("buy4").value.trim();

  const win2 = document.getElementById("twoDigit").textContent;
  const win3 = document.getElementById("threeDigit").textContent;
  const win4 = document.getElementById("fourDigit").textContent;

  let result = [];

  if (buy2 && buy2 === win2) result.push("ถูกรางวัล 2 ตัว");
  if (buy3 && buy3 === win3) result.push("ถูกรางวัล 3 ตัว");
  if (buy4 && buy4 === win4) result.push("ถูกรางวัล 4 ตัว");

  document.getElementById("resultMsg").textContent = result.length > 0 ? result.join(" และ ") : "ไม่ถูกรางวัล";
});