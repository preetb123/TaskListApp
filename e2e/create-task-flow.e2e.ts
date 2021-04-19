import { device, expect, element, by } from 'detox';

import { loginUser } from './test-utils';

describe('Create task flow', () => {
  beforeAll(async () => {
    await device.launchApp();
    await loginUser();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should create a task', async () => {
    await expect(element(by.id('taskListScreen'))).toBeVisible();
    await expect(element(by.id('addTaskButton'))).toBeVisible();

    await element(by.id('addTaskButton')).tap();
    await expect(element(by.id('createTaskScreen'))).toBeVisible();

    await expect(element(by.id('taskInput'))).toBeVisible();
    await expect(element(by.id('backButton'))).toBeVisible();
    await expect(element(by.id('createTaskButton'))).toBeVisible();

    await element(by.id('taskInput')).tap();
    await element(by.id('taskInput')).typeText(
      `Sample task added from e2e test at ${Date.toString()}`,
    );
    await element(by.id('createTaskButton')).tap();

    await expect(element(by.id('taskListScreen'))).toBeVisible();
  });
});
