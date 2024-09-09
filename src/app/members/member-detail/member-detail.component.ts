import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
private memberService = inject(MemberService);
private route = inject(ActivatedRoute);
member?:Member;

ngOnInit(): void {
  this.loadMember();
}
loadMember(){
  const username= this.route.snapshot.paramMap.get('userName');
  if(!username) return;

  this.memberService.getMember(username).subscribe({
    next: member=>this.member= member 
  })
}
}
