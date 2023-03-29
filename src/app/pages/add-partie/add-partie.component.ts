import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IParties } from 'src/app/models/parties';

@Component({
  selector: 'app-add-partie',
  templateUrl: './add-partie.component.html',
  styleUrls: ['./add-partie.component.scss']
})
export class AddPartieComponent implements OnInit {
  public id:number = 0;
  serialNumberRequired:boolean = false;
  nameIsRequired:boolean = false;
  public addPartie:IParties = {
    serialNumber: '',
    name: '',
    phone: 0,
    address: '',
    detail: '' as any
  }
  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:any)=>{
      this.id = param.id;
    });
    if(this.id){
      console.log('param: ', this.id);
      this.getPartieById();
    }
  }

  getPartieById(){
    this.http.get('http://localhost:3000/parties/'+this.id).subscribe((res:any)=>{
      this.addPartie._id = res.record._id;
      this.addPartie.serialNumber = res.record.serialNumber;
      this.addPartie.name = res.record.name;
      this.addPartie.address = res.record.address;
      this.addPartie.phone = res.record.phone;
      this.addPartie.detail = res.record.detail;
    });
  }

  submitForm(){
    this.serialNumberRequired = false;
    this.nameIsRequired = false;
    if(!this.addPartie.serialNumber) this.serialNumberRequired = true;
    if(!this.addPartie.name) this.nameIsRequired = true;

    if(!this.serialNumberRequired && !this.nameIsRequired){
      if(this.id){
        this.http.put('http://localhost:3000/parties/'+this.id,this.addPartie).subscribe((res)=>{
          this.router.navigateByUrl('all-parties');
          this.toastr.success('Record Updated Successfully.', 'Success', {
            timeOut: 3000,
          });
        });
      } else {
        this.http.post('http://localhost:3000/parties',this.addPartie).subscribe((res)=>{
          this.router.navigateByUrl('all-parties');
          this.toastr.success('Record Added Successfully.', 'Success', {
            timeOut: 3000,
          });
        });
      };
    };
  }
}
