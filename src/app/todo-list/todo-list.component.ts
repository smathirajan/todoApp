import { Component, OnInit } from '@angular/core';
import {User, Task } from '../constants';
import { FormGroup, FormControl } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  user: User = {
    id: 1,
    name: 'Mathi'
  };

  tasks: any;

  form: any = FormGroup;

  filterValue: string = '';

  filterOptions = [
    { id: 'Active', name: 'Active' },
    { id: 'Completed', name: 'Completed'},
    { id: 'All', name: 'All'}
  ];

  constructor(private todoService: TodoService) {
    // let name = localStorage.getItem('userName');
    // this.userName = (name) ? name.toString() : '';
    this.getTasks();
  }

  ngOnInit(): void {
    // Testing purpose, todo
    // Since localStorage is used to manipulate the tasks list
    // Assume this object is present in the localStorage
    if(!localStorage.getItem('1')) {
      let userObject = {
        id: 1,
        name: 'Batman',
        tasks: []
      }
      localStorage.setItem('1', JSON.stringify(userObject));
    }
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      newTask: new FormControl('')
    });
  }

  getTasks() {
    this.tasks = this.todoService.getTodoList(this.user);
    console.warn(this.tasks);
    return this.tasks;
  }
  addTask(evt: any) {
    const task: Task = { id: Math.floor(Math.random() * 100) , task: this.form.value.newTask, status: 'Active'};
    this.todoService.addTask(this.user, task);
    this.getTasks();
  }

  completeTask(task: Task) {
    console.log(task);
    this.todoService.completeTask(this.user, task);
    this.getTasks();
  }

  deleteTask(task: Task) {
    this.todoService.deleteTask(this.user, task);
    this.getTasks();
  }

  filterTasks(action: any) {
    console.log(action);
    const selected = action.target.value;
    const filteredList = this.todoService.filterTasks(this.user, selected);
    this.tasks = filteredList;
  }
}
