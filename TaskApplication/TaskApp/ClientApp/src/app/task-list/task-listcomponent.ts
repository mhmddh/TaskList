import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  taskList: [];
  baseUrl: string;
  requestSent: boolean = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.requestSent = false;
    this.http.get<any>(this.baseUrl + 'api/Task').subscribe(result => {
      this.requestSent = true;
      this.taskList = result;
    }, error => console.error(error));
  } 


  deleteTask(id) {
    if (confirm('Are You Sure?')) {
      this.http.delete(this.baseUrl + 'api/Task/' + id).subscribe(result => {
        this.getAllTasks();
      }, error => console.error(error));
    }
   
  }

  openDetails(id) {
    this.router.navigate(['/task-details'], { queryParams: { id : id} });
  }

}

