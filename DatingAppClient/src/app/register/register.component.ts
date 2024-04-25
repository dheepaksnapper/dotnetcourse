import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() registerModeFromHome : boolean = false;
  @Output() cancleRegisterEvent = new EventEmitter();

  model : any = {};
  errorMessage : string = "";

  constructor(private accountService : AccountService) { }

  ngOnInit(): void { }

  cancleRegister(){
    this.cancleRegisterEvent.emit(false);
  }

  register(){
    this.accountService.resister(this.model).subscribe({
      next: user => {
        console.log(user);
        this.errorMessage = "";
        this.cancleRegister();
      },
      error : error => {
        console.log(error);
        this.errorMessage = "signup failed !!"
      }
    })
  }
}
