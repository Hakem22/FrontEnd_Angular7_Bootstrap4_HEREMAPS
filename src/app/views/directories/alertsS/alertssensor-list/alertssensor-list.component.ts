import { Component, OnInit } from '@angular/core';
import { AlertS } from '../../../../data/alert-s';
import { AlertSService } from '../../../../services/alert-s.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-alertssensor-list',
  templateUrl: './alertssensor-list.component.html',
  styleUrls: ['./alertssensor-list.component.scss']
})
export class AlertssensorListComponent implements OnInit {

  alerts: Observable< AlertS[]>;
  constructor(private alertService: AlertSService, private loginService:LoginService) { }

  ngOnInit() {
    this.alertService.findAll().subscribe(data => {
      this.alerts = data});
  }

  deleteAlert(id: number) {
    console.log("avant");
    this.alertService.deleteAlert(id)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  SelectedBy(){

  }
  Search(){
    
  }

  isAuthenticated(){
    console.log(this.loginService.isAuthenticated());
    return this.loginService.isAuthenticated();
  }
}
