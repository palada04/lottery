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
  checkUserInput(two, three, four);
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

function checkUserInput(two, three, four) {
  const buyTwo = document.getElementById("buyTwo").value.trim().padStart(2, '0');
  const buyThree = document.getElementById("buyThree").value.trim().padStart(3, '0');
  const buyFour = document.getElementById("buyFour").value.trim().padStart(4, '0');

  let result = [];

  if (buyTwo && buyTwo === two) result.push("ถูกรางวัลเลข 2 ตัว: " + buyTwo);
  if (buyThree && buyThree === three) result.push("ถูกรางวัลเลข 3 ตัว: " + buyThree);
  if (buyFour && buyFour === four) result.push("ถูกรางวัลเลข 4 ตัว: " + buyFour);

  if (result.length === 0) {
    document.getElementById("resultMsg").innerHTML = "ไม่ถูกรางวัล";
  } else {
    document.getElementById("resultMsg").innerHTML = result.join("<br>");
  }
}

document.getElementById("drawBtn").addEventListener("click", drawNumbers);