import { device, expect, element, by } from 'detox';

export const loginUser = async () => {
  await expect(element(by.id('email'))).toBeVisible();
  await expect(element(by.id('password'))).toBeVisible();
  if (device.getPlatform() === 'ios') {
    await element(by.id('email')).typeText('test@test.com');
  } else {
    await element(by.id('email')).replaceText('test@test.com');
  }

  await element(by.id('password')).tap();
  if (device.getPlatform() === 'ios') {
    await element(by.id('password')).typeText('password123');
  } else {
    await element(by.id('password')).replaceText('password123');
  }

  await element(by.id('loginButton')).tap();

  await expect(element(by.id('taskListScreen'))).toBeVisible();
};