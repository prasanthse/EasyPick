import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  category: any;

  constructor(private global: GlobalService) { }

  ngOnInit() {
    this.category = "customer";
  }

  SignUp(){
    this.global.PresentToast("Register Success!", "success", 2000);
    this.global.NavigateWithoutParam('/home');
  }
}
