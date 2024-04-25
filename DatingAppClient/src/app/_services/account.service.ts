import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:5001/api/"
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http : HttpClient) { }

  setCurrentUser(user : User){
    this.currentUserSource.next(user);
  }

  login(model : any){
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map( user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  resister(model : any){
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }
}
