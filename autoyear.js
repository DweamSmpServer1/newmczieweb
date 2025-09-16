  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  document.getElementById("year").textContent =
    currentYear > startYear ? `${startYear}–${currentYear}` : startYear;
