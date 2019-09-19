import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CitizenService } from '../../../services/citizen.service';
import { ActeurService } from '../../../services/acteur.service';
import { LoginService } from '../../../services/login.service';
import { AlertCService } from '../../../services/alert-c.service';
import { AlertS } from '../../../data/alert-s';
import { AlertC } from '../../../data/alert-c';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from '../../../services/media.service';
declare var L: any;
@Component({
  selector: 'app-getactor-alerts',
  templateUrl: './getactor-alerts.component.html',
  styleUrls: ['./getactor-alerts.component.scss']
})
export class GetactorAlertsComponent implements OnInit {

  @Input() id: String;
  @ViewChild("map")
    public mapElement: ElementRef;
    private appId="DWYW4NT6SmZxJ1HlOXIx";
    private appCode="lvhjnhHfAOZFhygL_QtBeA";
    private map: any;
    public srcTiles: string;
    alertSensor: Observable<AlertS[]>;
    alertCitizen: Observable<any>;
    blob: any;


  
  constructor(private route: ActivatedRoute, private acteurService: ActeurService, private loginService: LoginService,
    private alertService: AlertCService, private sanitizer: DomSanitizer, private mediaService: MediaService)  
     
     { }

  ngOnInit() {

    this.srcTiles = "https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=" + this.appId + "&app_code=" + this.appCode + "&ppi=320";

    const id =this.route.snapshot.paramMap.get('id');
    console.log("isbn is: "+id);

    this.acteurService.findAllAlertSensor(id).subscribe(
      data => {this.alertSensor=data 
      console.log(data);},
      error => console.log(error));

      this.acteurService.findAllAlertCitizen(id).subscribe(
        data => {
          this.alertCitizen=data;
        console.log(data);
        this.alertCitizen.forEach(element => { 
          this.mediaService.getUri(element.id).subscribe(
            data => {
              console.log(data);
            // this.downloadFileSystem(data);
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

    isAdmin(){
      console.log(this.loginService.isAdmin());
      return this.loginService.isAdmin();
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
