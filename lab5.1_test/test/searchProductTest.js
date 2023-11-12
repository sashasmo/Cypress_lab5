// Пошук довільного товару:
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Функція для створення і налаштування драйвера
async function setupDriver() {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments('--start-maximized'); // Максимізує вікно браузера
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();
  return driver;
}

// Основна функція для виконання тесту
async function searchProductTest() {
  const driver = await setupDriver();

  try {
    // Відкрити веб-сторінку
    await driver.get('http://demo-store.seleniumacademy.com/');

    // Знайти поле для введення тексту пошуку
    const searchBox = await driver.findElement(By.id('search'));

    // Ввести пошуковий запит (наприклад, "shirt")
    searchBox.sendKeys('shirt', Key.RETURN);

    // Очікування завантаження результатів пошуку
    await driver.wait(until.titleContains('Search results'), 5000);

    // Вивести заголовок сторінки з результатами пошуку
    const pageTitle = await driver.getTitle();
    console.log('Page Title:', pageTitle);
  } finally {
    // Завершити роботу драйвера
    driver.quit();
  }
}

// Виклик функції для тестування
searchProductTest();
