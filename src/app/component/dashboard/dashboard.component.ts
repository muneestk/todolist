import { Component,OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = []

  addTaskValue : string ='';
  editTaskValue : string ='';
  errorMessage: string = ''; 


  constructor(private crudService : CrudService){ }


   ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = ''
     this.taskObj = new Task()
     this.taskArr = [];
     this.getAllTask()

   }


   //all task listing

   getAllTask() {
    this.crudService.getAllTask().subscribe((result) =>{
      this.taskArr = result
      console.log(result,'#alltask');
      
    })
   }

   //adding task
 
  addTask() {
    if (!this.addTaskValue || this.addTaskValue.trim() === '') {
      this.errorMessage = 'Please enter a task name.';
      return;
    }

    // Check for duplication
    const isDuplicate = this.taskArr.some(task => task.task_name.toLowerCase() === this.addTaskValue.toLowerCase());
    if (isDuplicate) {
      this.errorMessage = 'Task with the same name already exists.';
      return;
    }

    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe((result) => {
      this.ngOnInit();
      console.log(result, '#addTask');
      this.addTaskValue = '';
      this.editTaskValue = '';
    });
  }

    
   //edit task

   editTask() {

    if (!this.editTaskValue || this.editTaskValue.trim() === '') {
      this.errorMessage = 'Please enter a task name.';
      return;
    }

    // Check for duplication
    const isDuplicate = this.taskArr.some(task => task.task_name.toLowerCase() === this.editTaskValue.toLowerCase());
    if (isDuplicate) {
      this.errorMessage = 'Task with the same name already exists.';
      return;
    }

    this.taskObj.task_name = this.editTaskValue
    this.crudService.editTask(this.taskObj).subscribe((result)=>{
      this.ngOnInit();
      console.log(result,'#editTask');
      
    })
   }


   //delete tasks

   deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe((result)=>{
      this.ngOnInit();
      console.log(result,'#deleteTask');
      
    })
   }

   //calling edit task 

   call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
   }
}
