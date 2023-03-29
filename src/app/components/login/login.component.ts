import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginInfo } from 'src/app/models/student';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginInfo:ILoginInfo = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  registerEvent(){
    this.router.navigateByUrl('sign-up');
  };

  signInEvent(){
    console.log('signInEvent: ');
    this.http.post('http://localhost:3000/user/login',this.loginInfo).subscribe((res)=>{
    localStorage.setItem('userInfo',JSON.stringify(res));
    this.router.navigateByUrl('all-parties');
    this.toastr.success('Welcome To Khata Book.', 'Success', {
      timeOut: 3000,
    });
  },(err)=>{
      this.toastr.error('Incorrect Email or Passowrd', 'Error', {
        timeOut: 3000,
      });  
  });
  }

}
