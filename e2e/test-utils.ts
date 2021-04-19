import { expect, element, by } from 'detox';

export const loginUser = async () => {
  await expect(element(by.id('email'))).toBeVisible();
  await expect(element(by.id('password'))).toBeVisible();
  // await element(by.id('email')).typeText('test@test.com');
  await element(by.id('email')).replaceText('test@test.com');
  await element(by.id('password')).tap();
  // await element(by.id('password')).typeText('password123');
  await element(by.id('password')).replaceText('password123');

  await element(by.id('loginButton')).tap();

  await expect(element(by.id('taskListScreen'))).toBeVisible();
};