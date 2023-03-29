import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISignupInfo } from 'src/app/models/student';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  public userRole:any = [
    {label: 'Owner',value:'admin'},
    {label: 'manager',value:'manager'},
    {label: 'employee',value:'employee'}
  ]
  public signupInfo:ISignupInfo = {
    name: '',
    email: '',
    password: '',
    role: ''
  };
  emailIsRequired: boolean = false;
  passwordIsRequired:boolean = false;
  roleIsRequired:boolean = false;

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log('22:',this.signupInfo);
    this.emailIsRequired = false;
    this.passwordIsRequired = false;
    this.roleIsRequired = false;
    if(!this.signupInfo.email) this.emailIsRequired = true;
    if(!this.signupInfo.password) this.passwordIsRequired = true;
    if(!this.signupInfo.role) this.roleIsRequired = true;
    
    if(!this.emailIsRequired && !this.passwordIsRequired && !this.roleIsRequired){
      this.http.post('http://localhost:3000/user/add-role',this.signupInfo).subscribe((res)=>{
        this.router.navigateByUrl('all-parties');
      });
    }
  }

}
