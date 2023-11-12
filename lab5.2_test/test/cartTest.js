// Тестування роботи корзини:
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
async function cartTest() {
  const driver = await setupDriver();

  try {
    // Відкрити веб-сторінку
    await driver.get('http://demo-store.seleniumacademy.com/');

    // Знайти товар, який ви хочете додати в корзину (наприклад, "Magic Mouse")
    const productLink = await driver.findElement(By.linkText('Magic Mouse'));

    // Клікнути на посилання товару
    productLink.click();

    // Дочекатися завантаження сторінки товару
    await driver.wait(until.titleContains('Magic Mouse'), 5000);

    // Знайти кнопку "Add to Cart"
    const addToCartButton = await driver.findElement(By.id('product-addtocart-button'));

    // Клікнути на кнопку "Add to Cart"
    addToCartButton.click();

    // Дочекатися відобразження повідомлення про успішне додавання товару в корзину
    await driver.wait(until.elementLocated(By.className('success-msg')), 10000);

    // Знайти посилання "View and Edit Cart"
    const viewCartLink = await driver.findElement(By.linkText('View and Edit Cart'));

    // Клікнути на посилання "View and Edit Cart"
    viewCartLink.click();

    // Дочекатися завантаження сторінки корзини
    await driver.wait(until.titleContains('Shopping Cart'), 5000);

    // Вивести заголовок сторінки корзини
    const pageTitle = await driver.getTitle();
    console.log('Page Title:', pageTitle);
  } finally {
    // Завершити роботу драйвера
    driver.quit();
  }
}

// Виклик функції для тестування
cartTest();
