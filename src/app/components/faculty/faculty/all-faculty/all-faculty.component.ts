import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFaculty } from 'src/app/models/faculty';

@Component({
  selector: 'app-all-faculty',
  templateUrl: './all-faculty.component.html',
  styleUrls: ['./all-faculty.component.scss']
})
export class AllFacultyComponent implements OnInit {
  public facultyRecord:IFaculty[] = [];
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getTeacherRecord();
  }

  getTeacherRecord(){
    this.http.get('http://localhost:3000/faculty').subscribe((res:any)=>{
      this.facultyRecord = res.record;
    })
  }

  editTeacher(id:any){
    this.router.navigate(['/add-faculty'],{ queryParams: { id: id } });
  }

  deleteTeacher(id:any,record:IFaculty){
    this.http.delete('http://localhost:3000/faculty/'+id).subscribe((res)=>{
      if(res){
        this.getTeacherRecord();
      };
    });
  }
}
