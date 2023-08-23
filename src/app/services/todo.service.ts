import { Injectable } from '@angular/core';
import { User, Task, TaskDetails } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodoList(user: User)  {
    const id = user && user.id ? user.id.toString() : '';
    const taskDetails = localStorage.getItem(id);
    return taskDetails ? JSON.parse(taskDetails) : null;
  }

  addTask(user: User, task: Task) {
    let taskDetails = this.getTodoList(user);
    // taskDetails = taskDetails ? JSON.parse(taskDetails) : {tasks: []};
    taskDetails['tasks'].push(task);
    localStorage.setItem(user.id.toString(), JSON.stringify(taskDetails));
  }

  deleteTask(user: User, task: Task) {
    const tasks = this.getTodoList(user);
    tasks.tasks= tasks.tasks.filter((taskItem: any) => taskItem.id !== task.id);
    localStorage.setItem(user.id.toString(), JSON.stringify(tasks));
  }
  completeTask(user: User, task: Task) {
    const tasks = this.getTodoList(user);
    tasks.tasks.map((taskItem: any) => {
      if (taskItem.id === task.id) {
        taskItem.status = 'Completed';
      }
    });
    localStorage.setItem(user.id.toString(), JSON.stringify(tasks));
  }

  filterTasks(user: User, status: string) {
    const tasks = this.getTodoList(user);
    console.log(tasks);
    if(status === 'All') {
      return tasks;
    }
    tasks.tasks= tasks.tasks.filter((task: any) => task.status === status);
    return tasks;
  }
}
