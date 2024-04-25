import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model : any = {};
  loggedIn = false;
  constructor(public accountService :AccountService){

  }

  ngOnInit(): void {
    console.log('NavComponent initialied.');
    this.getCurrentUser();
    // set login values for debuggingd
    this.model.username = "smile";
    this.model.password = "smile";

  }

  getCurrentUser(){
    const userString = localStorage.getItem('user');
    if(userString){
      this.accountService.setCurrentUser(JSON.parse(userString));
    }
  }

  login(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: user => {
        console.log(user);
        if(user){
          this.loggedIn = !!user;
        }
      },
      error: errorResponce => {
        console.log(errorResponce);
      },
      complete: () => {
        console.log('loggedin request completed');
      }
    });
  }

  logout(){
    this.accountService.logout();
  }
}
