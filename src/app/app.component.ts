import { Component, NgModule } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterOutlet, TitleStrategy } from '@angular/router';
import { Task } from './Task';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass,
    FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'todo-list'
  // tasks1 = new Array<Task>()
  tasks: Task[] = []
  taskTitle: string = ''
  taskTitleSearch: string = '';

  getList(): Task[] {
    return [
      {
        id: 1,
        title: 'Wake Up At 07:00',
        status: 1
      },
      {
        id: 2,
        title: 'Esfahan Angular Course Session 03',
        status: 1
      },
      {
        id: 3,
        title: 'Complete HRM Project',
        status: 1
      }
    ]
  }

  constructor() {
    this.tasks = this.getList()
  }

  addTask() {
    if (!this.taskTitle) {
      alert('Title cant be empty.')
      return
    }

    if (this.tasks.find(x => x.title == this.taskTitle)) {
      alert('Task already defined.')
      return
    }

    const task: Task = {
      id: this.tasks.length + 1,
      title: this.taskTitle,
      status: 1
    }

    this.tasks.push(task)
    this.taskTitle = ''
  }

  titleChanged() {
    console.log(this.taskTitle)
  }

  changeStatus(taskId: number, status: number) {
    const task = this.tasks.find(x => x.id == taskId)!
    task.status = status
  }

  deleteTask(taskId: number) {
    const task = this.tasks.find(x => x.id == taskId)!
    if (confirm(`Do you want to delete ${task.title}`) == true) {
      const index = this.tasks.indexOf(task)
      this.tasks.splice(index, 1)
    }
  }

  deleteAll() {
    this.tasks = [];//this.getList()
  }

  trackByItems(index: number, task: Task): number {
    return task.id
  }
  //
  applyFilter() {

    this.taskTitleSearch = this.taskTitleSearch.trim();
    //this.taskTitleSearch = this.taskTitleSearch.toLowerCase();
    console.log(this.taskTitleSearch);
    // const result = this.tasks.filter((obj) => {
    //   return obj.title === this.taskTitleSearch;
    // });

    const result = this.tasks.filter((obj) => {
      return obj.title.toLowerCase().includes(this.taskTitleSearch.toLowerCase());
    });
    if (this.taskTitleSearch)
      this.tasks = result;
    else {

      this.tasks = this.getList();
    }




  }

}