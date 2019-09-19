import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensorService } from '../../../services/sensor.service';
import { LoginService } from '../../../services/login.service';
import { Observable } from 'rxjs';
import { AlertS } from '../../../data/alert-s';
import { AlertCService } from '../../../services/alert-c.service';
declare var L: any;

@Component({
  selector: 'app-getits-alerts',
  templateUrl: './getits-alerts.component.html',
  styleUrls: ['./getits-alerts.component.scss']
})
export class GetitsAlertsComponent implements OnInit {

  @Input() isbn: String;
  alerts: Observable< AlertS[]>;
  @ViewChild("map")
    public mapElement: ElementRef;
    private appId="DWYW4NT6SmZxJ1HlOXIx";
    private appCode="lvhjnhHfAOZFhygL_QtBeA";
    private map: any;
    public srcTiles: string;
  
  constructor(private route: ActivatedRoute, private sensorService: SensorService, private loginService: LoginService,
    private alertService: AlertCService) { }

  ngOnInit() {

    this.srcTiles = "https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=" + this.appId + "&app_code=" + this.appCode + "&ppi=320";

    const id =this.route.snapshot.paramMap.get('id');
    console.log("isbn is: "+id);

    this.sensorService.findAllAlerts(id).subscribe(
      data => {this.alerts=data 
      console.log(data);},
      error => console.log(error));
  }

  public ngAfterViewInit() {
    this.map = L.map(this.mapElement.nativeElement, {
        center: [35.1947429, -0.6238866],
        zoom: 10,
        layers: [L.tileLayer(this.srcTiles)],
        zoomControl: true
    });}

  isAuthenticated(){
    console.log(this.loginService.isAuthenticated());
    return this.loginService.isAuthenticated();
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

  seeOnMap(al,log){
    this.map.remove();
   this.ngAfterViewInit(); 
   L.marker([al, log]).addTo(this.map);
  }

}
