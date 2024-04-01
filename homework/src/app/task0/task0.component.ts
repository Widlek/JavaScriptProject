import { Component } from '@angular/core';
import { Food, foodArray } from '../food';

@Component({
  selector: 'app-task0',
  templateUrl: './task0.component.html',
  styleUrl: './task0.component.css'
})
export class Task0Component {
  
  array:Food[] = foodArray;


}
