import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IGiveAndTake, IParties } from 'src/app/models/parties';

@Component({
  selector: 'app-add-new-give-and-take',
  templateUrl: './add-new-give-and-take.component.html',
  styleUrls: ['./add-new-give-and-take.component.scss']
})
export class AddNewGiveAndTakeComponent implements OnInit {
  public id:number = 0;
  recordId:number = 0;
  billNoIsRequired:boolean = false;
  public particeInfo:IParties = {
    serialNumber: '',
    name: '',
    phone: 0,
    address: '',
    detail: ''
  };
  public newGiveAndTake:IGiveAndTake = {
    date: new Date,
    billNumber: 0,
    weight: 0,
    price: 0,
    youGave: 0,
    pay: 0,
    total: 0
  }
  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:any)=>{
      this.id = param.id;
      this.recordId = param.recordId;
    });
    if(this.id){
      this.getPartieById();
    }
  }

  getPartieById(){
    this.http.get('http://localhost:3000/parties/'+this.id).subscribe((res:any)=>{
      this.particeInfo._id = res.record._id;
      this.particeInfo.serialNumber = res.record.serialNumber;
      this.particeInfo.name = res.record.name;
      this.particeInfo.address = res.record.address;
      this.particeInfo.phone = res.record.phone;
      this.particeInfo.detail = res.record.detail;

      if(this.particeInfo.detail && this.recordId){
        const records = JSON.parse(this.particeInfo.detail);
        const record = records.find((record:any)=> record.id == this.recordId);
        console.log('record: ', record);
        this.newGiveAndTake = {
          date: record.date,
          billNumber: record.billNumber,
          weight: record.weight,
          price: record.price,
          youGave: record.youGave,
          pay: record.pay,
          total: record.total
        };
        console.log("this.newGiveAndTake:",this.newGiveAndTake);
        
      }
    });
  }

  submitForm(){
    this.billNoIsRequired = false;
    if(!this.newGiveAndTake.billNumber) this.billNoIsRequired = true;

    if(!this.billNoIsRequired){
      this.newGiveAndTake['id'] = Date.now();
      const obj:any = {...this.newGiveAndTake};
      this.newGiveAndTake.total = (obj.weight * obj.price) + (obj.pay - obj.youGave);
      console.log('this.newGiveAndTake.total: ', this.newGiveAndTake.total);
      // if(this.newGiveAndTake.weight && this.newGiveAndTake.price){
      //   this.newGiveAndTake.total = this.newGiveAndTake.weight * this.newGiveAndTake.price;
      // } 

      // if(this.newGiveAndTake.youGave){
      //   this.newGiveAndTake.total = this.newGiveAndTake.total - this.newGiveAndTake.youGave;
      // }

      // if(this.newGiveAndTake.pay){
      //   this.newGiveAndTake.total = this.newGiveAndTake.total + this.newGiveAndTake.pay;
      // }
  
      // if(this.newGiveAndTake.weight && this.newGiveAndTake.price && this.newGiveAndTake.youGave){
      //   this.newGiveAndTake.total = this.newGiveAndTake.weight * this.newGiveAndTake.price - this.newGiveAndTake.youGave;
      // }
      console.log("this.newGiveAndTake.total:",this.newGiveAndTake.total);
      
        let value = '';
        if(this.particeInfo.detail){
          const arr = JSON.parse(this.particeInfo.detail as any);
          if(this.recordId){
            const index = arr.findIndex((record:any)=> record.id == this.recordId);
            arr[index] = this.newGiveAndTake;
          } else {
            arr.push(this.newGiveAndTake);
          }
          value = JSON.stringify(arr);
        } else if(this.particeInfo.detail == ''){
          value = JSON.stringify([this.newGiveAndTake]);
        };
        this.particeInfo.detail = value as any;
        console.log('this.particeInfo.detail: ', this.particeInfo.detail);
      if(this.id){
        this.http.put('http://localhost:3000/parties/'+this.id,this.particeInfo).subscribe((res)=>{
          this.router.navigate(['/partie-detail'],{ queryParams: { id: this.id } });
          this.toastr.success('Record Added Successfully.', 'Success', {
            timeOut: 3000,
          }); 
        });
      };
    };
  }
}
