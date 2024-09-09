
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, JsonPipe } from '@angular/common';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from './register/register.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet, NavComponent,
     CommonModule, NgbModule,
     RouterLink, HomeComponent,
     RegisterComponent, MemberCardComponent,
     MemberDetailComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DatingApp';
  accountService= inject(AccountService); 
users:any;

  
  setCurrentUser(){
    const userString= localStorage.getItem('user');
    if(!userString) return;

    const user= JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}
