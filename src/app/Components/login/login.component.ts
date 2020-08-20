import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private global: GlobalService) { }

  ngOnInit() {}

  Login(){
    this.global.PresentToast("Login Success!", "success", 2000);
    this.global.NavigateWithoutParam('/home');
  }
}
