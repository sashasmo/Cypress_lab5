// Перевірку, чи відображається повідомлення про успішне додавання товару до корзини:
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
async function checkCartMessageTest() {
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
    const successMessage = await driver.findElement(By.className('success-msg'));

    // Перевірка, чи повідомлення існує на сторінці
    if (await successMessage.isDisplayed()) {
      console.log('Success message displayed: Item added to cart');
    } else {
      console.log('Success message not displayed');
    }
  } finally {
    // Завершити роботу драйвера
    driver.quit();
  }
}

// Виклик функції для тестування
checkCartMessageTest();
