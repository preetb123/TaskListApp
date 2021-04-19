import {
  Instance,
  SnapshotOut,
  types,
  flow,
  getSnapshot,
  applySnapshot,
  destroy,
} from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
import { TaskListModel } from '../task-list/task-list';
import { UserModel } from '../user/user';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
  searchString: types.optional(types.string, ''),
  taskList: types.optional(TaskListModel, {} as any),
  user: types.maybe(UserModel),
})
  .extend(withEnvironment)
  .views(self => ({
    get isLoggedIn() {
      return self.user?.uid ? true : false;
    },
    get filteredTasks() {
      const tasks = self.taskList.tasks;
      if (self.searchString) {
        return tasks.filter(item => item.title.includes(self.searchString));
      } else {
        return tasks;
      }
    },
  }))
  .actions(self => ({
    resetStore() {
      applySnapshot(self, {});
    },
    forceLogout() {
      this.resetStore();
    }
  }))
  .actions((self) => ({
    setSearchString(searchString: string) {
      self.searchString = searchString;
    },
    signIn: flow(function* signIn(email: string, password: string) {
      const user = yield self.environment.api.signIn(email, password);
      self.user = UserModel.create(user);
    }),
    signOut: flow(function* signout() {
      try {
        yield self.environment.api.signout();
        self.resetStore();
        console.log('signout successful');
      } catch (error) {
        throw new Error(error);
      }
    }),
  }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
