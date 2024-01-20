document.addEventListener("DOMContentLoaded", function () {
  const calendarElement = document.getElementById("calendar");
  const monthSelect = document.getElementById("month-select");
  const yearSelect = document.getElementById("year-select");
  const currentMonthYearDisplay = document.getElementById("currentMonthYear");
  const memoText = document.getElementById("memo-text");
  const saveMemoButton = document.getElementById("save-memo");
  let selectedDate = null;

  saveMemoButton.addEventListener("click", function () {
    if (selectedDate) {
      localStorage.setItem(selectedDate, memoText.value);
      alert("メモが保存されました");
    }
  });

  // 現在の月と年を設定
  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // ドロップダウンの選択肢を設定
  for (let i = 0; i < 12; i++) {
    monthSelect.appendChild(new Option(i + 1, i));
  }
  for (let i = currentYear - 10; i <= currentYear + 10; i++) {
    yearSelect.appendChild(new Option(i, i));
  }

  // ドロップダウンの初期値を設定
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  updateCurrentMonthYearDisplay();

  // ドロップダウンの値が変更されたときのイベントリスナー
  monthSelect.addEventListener("change", function () {
    currentMonth = this.value;
    generateCalendar(currentMonth, currentYear);
    updateCurrentMonthYearDisplay();
  });

  yearSelect.addEventListener("change", function () {
    currentYear = this.value;
    generateCalendar(currentMonth, currentYear);
    updateCurrentMonthYearDisplay();
  });

  generateCalendar(currentMonth, currentYear);

  // 選択中の月と年を表示する関数
  function updateCurrentMonthYearDisplay() {
    currentMonthYearDisplay.innerText = `${currentYear}年 ${
      parseInt(currentMonth) + 1
    }月`;
  }

  function generateCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    calendarElement.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
      calendarElement.innerHTML += "<div></div>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.className = "calendar-day";
      dayElement.innerText = day;
      dayElement.addEventListener("click", function () {
        selectedDate = `${year}-${parseInt(month) + 1}-${day}`;
        memoText.value = localStorage.getItem(selectedDate) || "";
      });
      calendarElement.appendChild(dayElement);
    }
  }
});
