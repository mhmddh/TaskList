import { Component , Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
})
export class TaskDetailsComponent {
  baseUrl: string;
  task: any = {};

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private _Activatedroute: ActivatedRoute) {
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
     this._Activatedroute.queryParams.subscribe(params => {
       if (+params['id'] > 0) {
         this.getTaskById(+params['id'])
       }
     });
  }

  getTaskById(id) {
    this.http.get(this.baseUrl + 'api/Task/' + id).subscribe(result => {
      this.task = result;
    }, error => console.error(error));
  }

  saveTask() {
    if (this.task.id > 0) {
      this.http.put(this.baseUrl + 'api/Task/'+this.task.id, this.task).subscribe(result => {
        this.goBackToList();
      }, error => console.error(error));
    } else {
      this.http.post(this.baseUrl + 'api/Task', this.task).subscribe(result => {
        this.goBackToList();
      }, error => console.error(error));
    }
  }
  goBackToList() {
    this.router.navigate(['/task-list']);
  }
}
