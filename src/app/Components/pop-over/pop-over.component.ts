import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {

  private itemCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() { }

  ngOnInit() {}

  SelectCount(count){
    
  }
}
