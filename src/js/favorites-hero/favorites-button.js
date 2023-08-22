getDataFromLocalStorage();

// Створюємо функцію, яка дістає дані з локального сховища
export function getDataFromLocalStorage() {
  const storageData = localStorage.getItem('dishLocalKey');

  if (storageData) {
    const parsedData = JSON.parse(storageData);
    const categoryMap = new Map(); // Створюємо об'єкт Map для відстеження створених кнопок

    parsedData.forEach(item => {
      if (!categoryMap.has(item.category)) {
        categoryMap.set(item.category, true);
      }
    });

    const uniqueCategories = Array.from(categoryMap.keys());

    // Перевіряємо чи існують категорії, і якщо так, то створюємо кнопки
    if (uniqueCategories.length > 0) {
      createButtonMarkup(uniqueCategories);
    }
  } else {
    console.log('No data found in localStorage.');
    // Можна відобразити меню, яке було знизу
  }
}

// Функція, яка створює розмітку кнопок
function createButtonMarkup(categories) {
  const categoryContainer = document.getElementById('category-buttons');
  categoryContainer.classList.add('category-buttons');
  const buttonAll = document.createElement('button');
  buttonAll.textContent = 'All categories';
  buttonAll.classList.add('fav-button');
  buttonAll.addEventListener('click', () => handleCategoryClick('All'));
  categoryContainer.appendChild(buttonAll);

  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category;
    button.id = `category-${category}`; // Встановлюємо унікальний id для кнопки
    button.classList.add('fav-button');
    button.addEventListener('click', () => handleCategoryClick(category));
    categoryContainer.appendChild(button);
  });
}

// Функція обробки кліку на кнопку
function handleCategoryClick(category) {
  const buttons = document.querySelectorAll('.fav-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });

  const clickedButton = event.target;
  clickedButton.classList.add('active');

  // Додатковий код для обробки кліку на кнопку
}
