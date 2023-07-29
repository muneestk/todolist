import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string;

  constructor(private http : HttpClient) {
    this.serviceURL = "http://localhost:3000/tasks"
   }

   //adding tasks

   addTask(task : Task) : Observable <Task> {
     return this.http.post<Task>(this.serviceURL,task)
   }

 //tasks list printing

   getAllTask() : Observable <Task[]> {
    return this.http.get<Task[]>(this.serviceURL)
  }

  // deleting the task

  deleteTask(task : Task) : Observable <Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id)
  }

  // edit task

  editTask(task : Task) : Observable <Task> {
    return this.http.put<Task>(this.serviceURL+'/'+task.id,task)
  }
}
