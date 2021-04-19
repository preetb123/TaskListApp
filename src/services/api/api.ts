import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface ApiIterface {
  signout(): void;
  getTasks(userId: string, lastTaskId: number): void;
  updateTask(userId: string, taskId: string, isChecked: boolean): void;
  createTask(userId: string, taskString: string): void;
  signIn(email: string, password: string): void;
}

/**
 * Manages all requests to the API.
 */
export class Api implements ApiIterface {
  setup() { }

  async signout() {
    return await auth().signOut();
  }

  async getTasks(userId: string, lastTaskId: number | 0) {
    console.log('getTasks: ', lastTaskId);
    try {
      let ref = firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .orderBy('createdAt');

      if (lastTaskId) {
        console.log('withLastTaskId');
        ref = ref.startAfter(lastTaskId).limit(20);
      } else {
        console.log('without');
        ref = ref.limit(20);
      }

      const res = await ref.get();
      return res.docs.map(doc => {
        const { title, isChecked, createdAt } = doc.data();
        return { uid: doc.id, title, isChecked, createdAt };
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTask(userId: string, taskId: string, isChecked: boolean) {
    return await firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .doc(taskId)
      .update({ isChecked: isChecked });
  }

  async createTask(userId: string, taskString: string) {
    const tasksRef = firestore().collection(`users/${userId}/tasks`);
    const time = firestore.Timestamp.now().seconds;
    try {
      const createdTask = await tasksRef.add({
        title: taskString,
        isChecked: false,
        createdAt: time,
      });
      console.log('createdTask: ', createdTask);
      return {
        uid: createdTask.id,
        title: taskString,
        isChecked: false,
        createdAt: time,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      return {
        email: res.user.email,
        uid: res.user.uid,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
