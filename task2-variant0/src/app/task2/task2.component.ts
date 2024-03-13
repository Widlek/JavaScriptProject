import { Component } from '@angular/core';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrl: './task2.component.css'
})

export class Task2Component {
  fullName:string = "Shatsilo Zakhar Aliaksandrovich";
  phoneNumber:string = "+375291233650";
  email:string = "widleksc@gmail.com";
  city:string = "Minsk city";
  skills:string = "unknown";
  photo:string = "/assets/img/photo.png";
}
