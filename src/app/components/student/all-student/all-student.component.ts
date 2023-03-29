import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAddStudent } from 'src/app/models/student';

@Component({
  selector: 'app-all-student',
  templateUrl: './all-student.component.html',
  styleUrls: ['./all-student.component.scss']
})
export class AllStudentComponent implements OnInit {
public studentRecord:IAddStudent[] = [];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getStudentRecord();
  }

  getStudentRecord(){
    this.http.get('http://localhost:3000/student').subscribe((res:any)=>{
      this.studentRecord = res.record;
    })
  }

  editStudent(id:any){
    this.router.navigate(['/add-student'],{ queryParams: { id: id } });
  }

  deleteStudent(id:any,record:IAddStudent){
    this.http.delete('http://localhost:3000/student/'+id).subscribe((res)=>{
      if(res){
        this.getStudentRecord();
      };
    });
  }

}
