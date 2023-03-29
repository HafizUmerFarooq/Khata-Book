import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddStudent } from 'src/app/models/student';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  public id:number = 0;
  public addStudent:IAddStudent = {
    studentName: '',
    fatherName: '',
    address: '',
    class: '',
    age: 0
  }
  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:any)=>{
      this.id = param.id;
    });
    if(this.id){
      console.log('param: ', this.id);
      this.getStudentById();
    }
  }

  getStudentById(){
    this.http.get('http://localhost:3000/student/'+this.id).subscribe((res:any)=>{
      this.addStudent._id = res.record._id;
      this.addStudent.studentName = res.record.studentName;
      this.addStudent.fatherName = res.record.fatherName;
      this.addStudent.address = res.record.address;
      this.addStudent.class = res.record.class;
      this.addStudent.age = res.record.age;
    });
  }

  submitForm(){
    console.log('student:',this.addStudent);
    if(this.id){
      this.http.put('http://localhost:3000/student/'+this.id,this.addStudent).subscribe((res)=>{
        this.router.navigateByUrl('student-record');
      });
    } else {
      this.http.post('http://localhost:3000/student',this.addStudent).subscribe((res)=>{
        this.router.navigateByUrl('student-record');
      });
    };
  }
}
