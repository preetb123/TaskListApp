import { device, expect, element, by } from 'detox';

import { loginUser } from './test-utils';

const sampleTasks = require('./test-data.json');

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

    const index = Math.floor(Math.random() * 499) + 1;

    await element(by.id('taskInput')).typeText(sampleTasks[index]);
    await element(by.id('createTaskButton')).tap();

    await expect(element(by.id('taskListScreen'))).toBeVisible();
  });
});
