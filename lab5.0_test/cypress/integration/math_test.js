describe('Math Test', () => {
    it('Performs math test', () => {
      cy.visit('http://suninjuly.github.io/math.html');
  
      // Прочитати значення x
      cy.get('#input_value').invoke('text').then((x) => {
        const result = calculateMathFunction(x);
        // Ввести відповідь в текстове поле
        cy.get('#answer').type(result);
  
        // Вибрати checkbox "I'm the robot"
        cy.get('[type="checkbox"]').check();
  
        // Вибрати radiobutton "Robots rule!"
        cy.get('[type="radio"]').check('robots');
  
        // Натиснути кнопку Submit
        cy.get('button[type="submit"]').click();
      });
    });
  });
  
  // Функція для обчислення математичної функції
  function calculateMathFunction(x) {
    // Ваш код для обчислення математичної функції тут
    return x;
  }
  