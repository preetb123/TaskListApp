import { device, expect, element, by } from 'detox';

import { loginUser } from './test-utils';

describe('logout flow', () => {
  beforeAll(async () => {
    await device.launchApp();
    await loginUser();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should logout the user and navigate to login screen', async () => {
    // await expect(element(by.id('taskListScreen'))).toBeVisible();
    // doesn't work on android: https://github.com/wix/Detox/issues/2119
    await element(by.id('taskListScreen')).swipe(
      'right',
      'slow',
      1,
      0.05,
      0.05,
    );

    //await element(by.id('taskListScreen')).tapAtPoint({ x: 15, y: 0 });
    await waitFor(element(by.text('test@test.com')))
      .toBeVisible()
      .withTimeout(2000);

    await expect(element(by.text('Log Out'))).toBeVisible();

    await element(by.text('Log Out')).tap();

    await expect(element(by.id('loginScreen'))).toBeVisible();
  });
});
