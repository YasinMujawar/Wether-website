import {
  CommonModule,
  DatePipe,
  JsonPipe,
  UpperCasePipe,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    UpperCasePipe,
    DatePipe,
  ],
  // templateUrl: './data.component.html',
  styleUrl: './data.component.css',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.getData();
  }
  days: any[] = [];
  data: any = {};
  user = {
    location: '',
    key: 'A85X6BHYQQQHXU7VPT4MHS2J7',
    type: 'json',
    unitGroup: 'metric',
  };
  getData() {
    this.http
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.user.location}?unitGroup=${this.user.unitGroup}&key=${this.user.key}&contentType=${this.user.type}`
      )
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.days = this.data['days'];
        this.days.length = 7;
      });
  }
  current: Date = new Date();
  // locationForm: FormGroup = new FormGroup({
  //   location: new FormControl(''),
  //   time: new FormControl(''),
  // });
  userRequest: { location: string; time: string } = {
    location: '',
    time: '',
  };
  onSave() {
    this.user.location = this.userRequest.location;
    this.getData();
  }
}
