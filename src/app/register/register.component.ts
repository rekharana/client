import { Component,  EventEmitter,  inject,  input,   OnInit,   Output,   output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    JsonPipe, NgIf,TextInputComponent,
    DatePickerComponent],

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
model:any={};
registerFrom: FormGroup = new FormGroup({});
validationErrors: string[] | undefined;

accountService = inject(AccountService);
private toastr= inject(ToastrService);
private router= inject(Router);

fb= inject(FormBuilder);
 usersFormHomeComponent= input<any>();
 cencelMode = output<boolean>();
 
 ngOnInit(): void {
   this.initializeFrom();
 }

 initializeFrom(){
  this.registerFrom= this.fb.group({
    gender:['male'],
    username: ['', Validators.required],
    knownAs: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    password: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
    confrimPassword: ['',[Validators.required, this.matchValues('password')]]
  });

  this.registerFrom.controls['password'].valueChanges.subscribe({
    next:()=> this.registerFrom.controls['confrimPassword'].updateValueAndValidity()
  })
 }

 matchValues(matchTo:string): ValidatorFn{
  return (control: AbstractControl) =>{
    return control.value=== control.parent?.get(matchTo)?.value? null:{ isMatching: true}
  }
 }
 register(){
  const dob = this.getDateOnly(this.registerFrom.get("dateOfBirth")?.value);
  this.registerFrom.patchValue({dateOfBirth:dob});  
  console.log(this.registerFrom.value);
  this.accountService.register(this.registerFrom.value).subscribe({
    next: _ => this.router.navigateByUrl("/members"),
    error: error=> this.validationErrors = error
  });
}
cancel(){
  console.log("cancel");  
  this.cencelMode.emit(true);
  console.log('cancelRegisterModeValue');
}
private getDateOnly(dob: string|undefined ){
  if(!dob) return;
  return new Date(dob).toISOString().slice(0,10);
}
}
