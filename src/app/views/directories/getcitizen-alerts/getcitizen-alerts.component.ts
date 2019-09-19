import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertC } from '../../../data/alert-c';
import { ActivatedRoute } from '@angular/router';
import { CitizenService } from '../../../services/citizen.service';
import { LoginService } from '../../../services/login.service';
import { AlertCService } from '../../../services/alert-c.service';
import { MediaService } from '../../../services/media.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var L: any;
@Component({
  selector: 'app-getcitizen-alerts',
  templateUrl: './getcitizen-alerts.component.html',
  styleUrls: ['./getcitizen-alerts.component.scss']
})
export class GetcitizenAlertsComponent implements OnInit {

  @Input() id: String;
  alerts: Observable< any>;
  @ViewChild("map")
    public mapElement: ElementRef;
    private appId="DWYW4NT6SmZxJ1HlOXIx";
    private appCode="lvhjnhHfAOZFhygL_QtBeA";
    private map: any;
    public srcTiles: string;
    blob: any;

  
  constructor(private route: ActivatedRoute, private citizenService: CitizenService, private loginService: LoginService,
    private alertService: AlertCService,private sanitizer: DomSanitizer, private mediaService: MediaService) { }

  ngOnInit() {

    this.srcTiles = "https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=" + this.appId + "&app_code=" + this.appCode + "&ppi=320";

    const id =this.route.snapshot.paramMap.get('id');
    console.log("isbn is: "+id);

    this.citizenService.findAllAlerts(id).subscribe(
      data => {this.alerts=data 
      console.log(data);
      this.alerts.forEach(element => { 
        this.mediaService.getUri(element.id).subscribe(
          data => {
            console.log(data);
          },
          err =>{
            let fileName=err.error.text
            console.log("heeer", fileName);
            this.alertService.getFile(fileName).subscribe(
              response => {
                const filename = response.headers.get('filename');
                console.log("#####",response);
                //this.saveFile(response.body, filename);
                this.blob = new Blob([response.body], {type: 'image/jpeg'}); 
                let objectURL = URL.createObjectURL(this.blob);
                element.uri = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                console.log("jjjjj", element.uri);
                      },
              err=> {
                  console.log("-------",err)
               });
              });
          

      });
    },
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
    console.log("avant", id);
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
