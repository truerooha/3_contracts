document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll(".navigation li");
  
    navItems.forEach(item => {
      item.addEventListener("click", function(event) {
        event.preventDefault(); // Предотвратить переход по ссылке
  
        // Снимите класс "active" со всех элементов навигации
        navItems.forEach(item => item.classList.remove("active"));
  
        // Установите класс "active" только для выбранного элемента
        item.classList.add("active");
      });
    });
  
    // По умолчанию установите класс "active" для элемента "Главное"
    document.getElementById("main").classList.add("active");
  });