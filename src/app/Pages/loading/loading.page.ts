import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.global.appVersion = "v 1.0";
    this.SwitchToNextTask();
  }

  SwitchToNextTask(){
    setTimeout(() => {
      this.global.NavigateWithoutParam('/login');
    }, 3500);
  }
}
