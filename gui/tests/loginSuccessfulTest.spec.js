
const {test, expect} = require('@playwright/test');
const { authInfo } = require('../../user');

test('test', async ({page}) => {
  
  await page.goto('https://netology.ru/?modal=sign_in');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(authInfo.userLogin);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(authInfo.userPassword);
  await page.screenshot({path: 'screenshots/success/AuthPage.png'});
  await page.getByTestId('login-submit-btn').click();

  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator('xpath=//div[@data-testid="header-navigatorBtn"]').locator('nth=0')).toBeVisible();
  await expect(page.locator('xpath=//div[@data-testid="header-navigatorBtn"]').locator('nth=0')).toHaveText("Каталог курсов");
  await page.screenshot({path: 'screenshots/success/CoursesPage.png'});

  // await expect(page.locator('xpath=(//a[@data-testid="profile-program-link"]//h3)[last()]')).toContainText(authInfo.userCourseName);
  // раз мы всё равно берём реальные данные для авторизации, почему бы не использовать и название курса?
  // вариант закомментирован, т. к. его сложно проверить тем, кто не студент "Нетологии"
});