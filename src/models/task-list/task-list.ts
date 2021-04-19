import { getParent, Instance, SnapshotOut, types, flow } from 'mobx-state-tree';
import { TaskModel, TaskSnapshot } from '../task/task';
import { withEnvironment } from '../extensions/with-environment';

/**
 * Store containing tasks and associated operations
 */
export const TaskListModel = types
  .model('TaskList')
  .props({
    tasks: types.optional(types.array(TaskModel), []),
  })
  .extend(withEnvironment)
  .actions(self => ({
    saveTasks: (taskSnapshots: TaskSnapshot[], shouldAppend: boolean) => {
      if (shouldAppend) {
        console.log('appending')
        self.tasks.push(...taskSnapshots);
      } else {
        console.log('replacing')
        self.tasks.replace(taskSnapshots);
      }
    },
    addTaskToTaskList: (taskSnapshots: TaskSnapshot) => {
      self.tasks.push(taskSnapshots);
    },
  }))
  .actions(self => ({
    getTasks: flow(function* getTasks() {
      // get the user id from the root store
      const userId = getParent(self, 1).user.uid;
      const tasksLength = self.tasks.length;
      const lastTaskId =
        tasksLength === 0 ? 0 : self.tasks[tasksLength - 1].createdAt;
      const tasks = yield self.environment.api.getTasks(userId, lastTaskId);
      console.log(tasks);
      if (tasks.length > 0) {
        self.saveTasks(tasks, lastTaskId > 0 && self.tasks.length > 0);
      }
      return tasks;
    }),
    createTask: flow(function* createTask(taskString: string) {
      const userId = getParent(self, 1).user.uid;
      const createdTask = yield self.environment.api.createTask(
        userId,
        taskString,
      );
      self.addTaskToTaskList(createdTask);
    }),
  }));

type TaskListType = Instance<typeof TaskListModel>;
export interface TaskList extends TaskListType { }
type TaskListSnapshotType = SnapshotOut<typeof TaskListModel>;
export interface TaskListSnapshot extends TaskListSnapshotType { }
export const createTaskListDefaultModel = () =>
  types.optional(TaskListModel, {});
