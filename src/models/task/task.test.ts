import { TaskModel } from './task';

test('task can be created', () => {
  const instance = TaskModel.create({
    uid: 'abcd',
    title: 'Test task',
    createdAt: Date.now(),
  });

  expect(instance).toBeTruthy();
});

test('task status can be toggled', () => {
  const unfinishedTask = TaskModel.create({
    uid: 'abcd',
    title: 'Test task',
  });

  unfinishedTask.toggle();

  expect(unfinishedTask.isChecked).toBeTruthy();
});
