import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * User model.
 */
export const UserModel = types.model('User').props({
  uid: types.identifier,
  email: types.maybe(types.string),
});

type UserType = Instance<typeof UserModel>;
export interface User extends UserType { }
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType { }
export const createUserDefaultModel = () => types.optional(UserModel, {});
