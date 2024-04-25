import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  registerMode = false;

  toggleRegisterMode(){
    this.registerMode = !this.registerMode;
  }

  cancleRegister(event : boolean){
    this.registerMode = event;
  }

}
