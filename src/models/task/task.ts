import { Instance, SnapshotOut, types, flow, getParent } from 'mobx-state-tree';
import { withEnvironment } from '../extensions/with-environment';
/**
 * Task model.
 */
export const TaskModel = types
  .model('Task')
  .extend(withEnvironment)
  .props({
    uid: types.identifier,
    title: types.string,
    isChecked: false,
    createdAt: types.number,
  })
  .actions(self => ({
    updateCheckedStatus(isChecked: boolean) {
      self.isChecked = isChecked;
    },
  }))
  .actions(self => ({
    toggle: flow(function* toggle() {
      const checkedState = !self.isChecked;
      const userId = getParent(self, 3).user.uid;
      try {
        yield self.environment.api.updateTask(userId, self.uid, checkedState);
        self.updateCheckedStatus(checkedState);
      } catch (error) {
        throw new Error(error);
      }
    }),
  }));

type TaskType = Instance<typeof TaskModel>;
export interface Task extends TaskType { }
type TaskSnapshotType = SnapshotOut<typeof TaskModel>;
export interface TaskSnapshot extends TaskSnapshotType { }
export const createTaskDefaultModel = () => types.optional(TaskModel, {});
