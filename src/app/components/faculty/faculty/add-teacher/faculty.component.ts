import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFaculty } from 'src/app/models/faculty';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  public id:number = 0;
  public addFaculty:IFaculty = {
    name:'',
    subject:'',
    address:'',
    phoneNumber:0
  }
  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:any)=>{
      this.id = param.id;
    });
    if(this.id){
      console.log('param: ', this.id);
      this.getTeacherById();
    }
  }

  getTeacherById(){
    this.http.get('http://localhost:3000/faculty/'+this.id).subscribe((res:any)=>{
      this.addFaculty._id = res.record._id;
      this.addFaculty.name = res.record.name;
      this.addFaculty.address = res.record.address;
      this.addFaculty.subject = res.record.subject;
      this.addFaculty.phoneNumber = res.record.phoneNumber;
    });
  }

  submitForm(){
    console.log('student:',this.addFaculty);
    if(this.id){
      this.http.put('http://localhost:3000/faculty/'+this.id,this.addFaculty).subscribe((res)=>{
        this.router.navigateByUrl('faculty-record');
      });
    } else {
      this.http.post('http://localhost:3000/faculty',this.addFaculty).subscribe((res)=>{
        this.router.navigateByUrl('faculty-record');
      });
    };
  }
}
