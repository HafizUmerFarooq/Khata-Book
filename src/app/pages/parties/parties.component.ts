import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IParties } from 'src/app/models/parties';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss']
})
export class PartiesComponent implements OnInit {
  public allParties:IParties[] = [];
  constructor(private http:HttpClient,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getStudentRecord();
  }

  getStudentRecord(){
    this.http.get('http://localhost:3000/parties').subscribe((res:any)=>{
      this.allParties = res.record;
    });
  }

  editPartie(id:any){
    this.router.navigate(['/add-partie'],{ queryParams: { id: id } });
  }

  deletePartie(id:any){
    let text = "Are You Sure You Want to Delete This Record.";
  if (confirm(text) == true) {
    this.http.delete('http://localhost:3000/parties/'+id).subscribe((res)=>{
      if(res){
        this.toastr.success('Record Deleted Successfully.', 'Success', {
          timeOut: 3000,
        }); 
        this.getStudentRecord();
      };
    });
  }
  }

  viewDetail(id:any){
    this.router.navigate(['/partie-detail'],{ queryParams: { id: id } });
  }

  addNewPartie(){
    this.router.navigate(['/add-partie']);
  }

}
