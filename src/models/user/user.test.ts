import { UserModel } from './user';

test('user can be created', () => {
  const instance = UserModel.create({
    uid: 'xyz',
  });

  expect(instance).toBeTruthy();
});
