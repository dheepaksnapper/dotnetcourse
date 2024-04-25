import { HttpClient } from '@angular/common/http';
import { compileClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class  AppComponent implements OnInit {
  title = 'DatingAppClient';
  users: any

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/user').subscribe({
      next: (responce) => { this.users = responce },
      error: (error) => { console.log(error); },
      complete: () => console.log('Request completed')
    })
  }

  getusers(): Observable<any> {
    return this.http.get('https://localhost:5001/api/user');
  }
}
