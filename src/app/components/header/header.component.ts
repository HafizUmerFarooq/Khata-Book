import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logoutEvent(){
    let text = "Are You Sure You Want to Logout.";
    if (confirm(text) == true) {
      this.toastr.success('Logout Successfully.', 'Success', {
        timeOut: 3000,
      });
      this.route.navigateByUrl('login');
      localStorage.removeItem('userInfo');
    }
  }

}
