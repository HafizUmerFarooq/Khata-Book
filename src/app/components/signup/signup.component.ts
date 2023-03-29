import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISignupInfo } from 'src/app/models/student';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupInfo:ISignupInfo = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.http.post('http://localhost:3000/user/signup',this.signupInfo).subscribe((res)=>{
      this.router.navigateByUrl('student-record');
    });
  }

}
