const pages = {
  main: {
      name: "Главное",
      path: "main",
  },
  contracts: {
      name: "Договоры",
      path: "contracts",
  },
  counterparties: {
      name: "Контрагенты",
      path: "counterparties",
  },
  search: {
    name: "Поиск",
    path: "search",
  },
  settings: {
    name: "Настройки",
    path: "settings",
  },
  support: {
    name: "Помощь",
    path: "support",
  }
};

let currentPage = pages.main;
changePage(currentPage);

document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll(".navigation li");
  
    navItems.forEach(item => {
      item.addEventListener("click", function(event) {
        event.preventDefault(); // Предотвратить переход по ссылке
  
        // Снимите класс "active" со всех элементов навигации
        navItems.forEach(item => item.classList.remove("active"));
  
        // Установите класс "active" только для выбранного элемента
        item.classList.add("active");

        if (pages[item.id]) {
            currentPage = pages[item.id];
            changePage(currentPage);
        }
      });
    });
  
    // По умолчанию установите класс "active" для элемента "Главное"
    document.getElementById("main").classList.add("active");
  });

  function changePage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('activePage'));

    const currentPage = document.getElementById("c-" + page.path);
    if (currentPage) {
        currentPage.classList.add('activePage');
    }
}