
const {test, expect} = require('@playwright/test');
const { authInfo } = require('../../user');

test('test', async ({page}) => {
  
  await page.goto('https://netology.ru/?modal=sign_in');

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill("3450d" + authInfo.userLogin);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill("aboba" + authInfo.userPassword);
  await page.screenshot({path: 'screenshots/wrongData/AuthPage.png'});
  await page.getByTestId('login-submit-btn').click();

  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  const errorPopup = page.getByTestId('login-error-hint');
  await expect(errorPopup).toBeVisible();
  await expect(errorPopup).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({path: 'screenshots/wrongData/ErrorPopup.png'});
});