import { device, expect, element, by } from 'detox';

import { loginUser } from './test-utils';

describe('search and update task status', () => {
  beforeAll(async () => {
    await device.launchApp();
    await loginUser();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create a task', async () => {
    await expect(element(by.id('taskListScreen'))).toBeVisible();
    await expect(element(by.id('searchboxInput'))).toBeVisible();


    await element(by.id('searchboxInput')).tap();
    await element(by.id('searchboxInput')).typeText("tenth");

    await element(by.text('tenth task')).tap();
    await expect(element(by.id('taskListScreen'))).toBeVisible();
  });
});
