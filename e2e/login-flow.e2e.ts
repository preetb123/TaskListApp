import { device, expect, element, by } from 'detox';

describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have login screen', async () => {
    await expect(element(by.id('loginScreen'))).toBeVisible();
  });

  it('should navigate to task list screen on successful login', async () => {
    await expect(element(by.id('email'))).toBeVisible();
    await expect(element(by.id('password'))).toBeVisible();
    await element(by.id('email')).typeText('test@test.com');
    await element(by.id('password')).tap();
    await element(by.id('password')).typeText('password123');

    await element(by.id('loginButton')).tap();

    await expect(element(by.id('taskListScreen'))).toBeVisible();
  });
});
