import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, single } from 'rxjs';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 private http = inject(HttpClient)
baseurl= environment.apiUrl;
currentUser= signal<User|null>(null);
login(model:any){
  return this.http.post<User>(this.baseurl+'account/login',model).pipe(
    map(user=>{
      if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUser.set(user);
      } 
    })
  )
 }
 register(model:any){
  return this.http.post<User>(this.baseurl+'account/register',model).pipe(
    map(user=>{
      if(user){
          localStorage.setItem('user',JSON.stringify(user));
         
          this.currentUser.set(user);
      } 
      return user;
    })
  )
 }
 logout(){
  localStorage.removeItem('user');
  this.currentUser.set(null);
 }
}


