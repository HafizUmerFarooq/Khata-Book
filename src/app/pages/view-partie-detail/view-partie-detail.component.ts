import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IParties } from 'src/app/models/parties';

@Component({
  selector: 'app-view-partie-detail',
  templateUrl: './view-partie-detail.component.html',
  styleUrls: ['./view-partie-detail.component.scss']
})
export class ViewPartieDetailComponent implements OnInit {
  public id:number = 0;
  public allParties:IParties[] = [];
  totalGiveAndTake: any = [];
  receivedAmount:number = 0;
  totalBalance:number = 0;
  totalPay:number = 0;
  remainingBalance:number = 0;
  public partieGiveAndTake:IParties = {
    serialNumber: '',
    name: '',
    phone: 0,
    address: '',
    detail: ''
  }

  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param:any)=>{
      this.id = param.id;
    });
    if(this.id){
      this.getPartieById();
    }
  }

  getPartieById(){
    this.http.get('http://localhost:3000/parties/'+this.id).subscribe((res:any)=>{
      console.log('res: ', res);
      this.partieGiveAndTake._id = res.record._id;
      this.partieGiveAndTake.serialNumber = res.record.serialNumber;
      this.partieGiveAndTake.name = res.record.name;
      this.partieGiveAndTake.address = res.record.address;
      this.partieGiveAndTake.phone = res.record.phone;
      this.partieGiveAndTake.detail = res.record.detail;

      this.totalGiveAndTake = this.partieGiveAndTake.detail !== '' ? JSON.parse(this.partieGiveAndTake.detail as any) : [];
      console.log('this.totalGiveAndTake: ', this.totalGiveAndTake);

      this.totalGiveAndTake?.forEach((balance:any)=>{
        if(balance.youGave){
          this.receivedAmount = this.receivedAmount + balance.youGave;
        };
        
        if(balance.total){
          this.totalBalance = this.totalBalance + balance.total;
        };

        if(balance.pay){
          this.totalPay = this.totalPay + balance.pay;
        }
      });

      // if(this.receivedAmount && this.totalBalance){
      //   this.remainingBalance = this.totalBalance - this.receivedAmount;
      // }
    });
  }

  editPartie(id:any){
    console.log('editPartie: ', id);
    this.router.navigate(['/add-new-giveAndTake'], { queryParams: { id: this.id,recordId:id } });
  }

  deletePartie(id:any){
    let text = "Are You Sure You Want to Delete This Record.";
  if (confirm(text) == true) {
    const arr = [...this.totalGiveAndTake];
    const index = arr?.findIndex((record:any)=> record?.id == id);
    let value = '';
    if(index > -1){
      arr.splice(index, 1);
      value = JSON.stringify(arr);
    }
    this.partieGiveAndTake.detail = value as any;
    this.http.put('http://localhost:3000/parties/'+this.id, this.partieGiveAndTake).subscribe((res)=>{
      if(res){
        this.toastr.success('Record Deleted Successfully.', 'Success', {
          timeOut: 3000,
        });
        this.getPartieById();
      };
    });
  }
  }

  addNewGiveAndTake(){
    this.router.navigate(['/add-new-giveAndTake'], { queryParams: { id: this.id } });
  }

}
