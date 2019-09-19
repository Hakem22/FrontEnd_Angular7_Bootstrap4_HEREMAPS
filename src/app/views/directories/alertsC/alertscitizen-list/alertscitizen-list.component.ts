import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertC } from '../../../../data/alert-c';
import { AlertCService } from '../../../../services/alert-c.service';
import { CitizenService } from '../../../../services/citizen.service';
import { LoginService } from '../../../../services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from '../../../../services/media.service';
declare var L: any;
@Component({
  selector: 'app-alertscitizen-list',
  templateUrl: './alertscitizen-list.component.html',
  styleUrls: ['./alertscitizen-list.component.scss']
})

export class AlertscitizenListComponent implements OnInit {

  alertC: Observable<any>;
  alertS: Observable<any>;
  citizen: any;
  citizencreated:boolean=false;
  SelectedAlertState: String;
  SelectedAlertSource: String;
  SelectedAlertType: String;
  isCollapsed: boolean=false;
  imageBlobUrl:any;
  blob: any;

  @ViewChild("map")
    public mapElement: ElementRef;
    private appId="DWYW4NT6SmZxJ1HlOXIx";
    private appCode="lvhjnhHfAOZFhygL_QtBeA";
    private map: any;
    public srcTiles: string;
    CurrentTime:any;


  constructor(private alertService: AlertCService,private citizenService: CitizenService, private loginService: LoginService, private sanitizer: DomSanitizer, private mediaService: MediaService) { 
    setInterval(() => {
      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds()}, 1);
}

  


  
  collapsed(event: any): void {
    // console.log(event);
  }

  ngOnInit() {
    this.srcTiles = "https://2.base.maps.api.here.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?app_id=" + this.appId + "&app_code=" + this.appCode + "&ppi=320";

    this.alertService.findAllStatfulC().subscribe(data => {
      this.alertC = data; 
      console.log(data.sort((x,y)=> x.id < y.id))
      let i=0;
      
      this.alertC.forEach(element => { 
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
    });

    this.alertService.findAllStatfulS().subscribe(data => {
      this.alertS = data; 

      console.log(data.sort((x,y)=> x.id < y.id))
      let i=0;
    });

    console.log("rrrrrrrrr",this.CurrentTime);

  }

  public ngAfterViewInit() {
    this.map = L.map(this.mapElement.nativeElement, {
        center: [35.1947429, -0.6238866],
        zoom: 10,
        layers: [L.tileLayer(this.srcTiles)],
        zoomControl: true
    });} 
  
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

  AddnewCitizen(data){
    
    console.log(data);
    this.citizen=data;
    this.citizencreated=true;
 /*   this.citizenService.createCitizen(data).subscribe(data =>
      {console.log(data); },
      err=> console.log("error")
    )*/
  }

  addnewAlertC(data){
    data.id=6;
    data.dateSend="2019-09-09";
    data.acteur=null;
    data.alertState=null;
    data.citizen=this.citizen;
    console.log(data)
    this.alertService.getTime().subscribe(
      res => {
        data.timeSend=res;
        console.log(res);
        console.log(data);
        this.alertService.createAlert(data).subscribe(
          data=> console.log(data),
          err=> console.log(err)
        )
      },
      err => console.log(err));
  
    
   
  }



   AlertsByState(event: any){
    this.SelectedAlertSource = event.target.value;
    console.log("state",this.SelectedAlertState);
    if(this.SelectedAlertSource=="VALID"){
      this.alertService.findAlertSByState('valid').subscribe(
      data => {this.alertS=data;
        console.log(data);},
        err => console.log(err));

      this.alertService.findAlertCByState('valid').subscribe(
          data => {this.alertC=data;
            console.log(data);},
            err => console.log(err));  
      
      }
  
    else  if(this.SelectedAlertSource=="INVALID") {
        this.alertService.findAlertSByState('invalid').subscribe(
          data => {this.alertS=data;
            console.log(data);},
            err => console.log(err));

        this.alertService.findAlertCByState('invalid').subscribe(
          data => {this.alertC=data;
            console.log(data);},
            err => console.log(err));    
          }
  
      else this.ngOnInit();          
   }



   AlertsByType(event: any){
    this.SelectedAlertSource = event.target.value;
    console.log("type",this.SelectedAlertState);
    if(this.SelectedAlertSource=="FIRE") this.alertService.findAlertByTypeC('fire').subscribe(
      data => {this.alertC=data;
        console.log(data);},
        err => console.log(err));
  
    else  if(this.SelectedAlertSource=="FLOOD") this.alertService.findAlertByTypeC('flood').subscribe(
          data => {this.alertC=data;
            console.log(data);},
            err => console.log(err));
    else   if(this.SelectedAlertSource=="EARTHEQUAKE") this.alertService.findAlertByTypeC('etq').subscribe(
              data => {this.alertC=data;
                console.log(data);},
                err => console.log(err));
          
    else  if(this.SelectedAlertSource=="ACCIDENT") this.alertService.findAlertByTypeC('acc').subscribe(
                  data => {this.alertC=data;
                    console.log(data);},
                    err => console.log(err));
        
    else  if(this.SelectedAlertSource=="AGGRESSION") this.alertService.findAlertByTypeC('agr').subscribe(
           data => {this.alertC=data;
                console.log(data);},
                  err => console.log(err));
                  
    else  if(this.SelectedAlertSource=="WATER_LEVEL") this.alertService.findAlertByTypeS('wl').subscribe(
              data => {this.alertS=data;
                console.log(data);},
                      err => console.log(err));
    else   if(this.SelectedAlertSource=="FOREST_FIRE") this.alertService.findAlertByTypeS('ff').subscribe(
               data => {this.alertS=data;
                  console.log(data);},
                      err => console.log(err));
                
      else this.ngOnInit();          
   }

   seeOnMap(al,log){
     this.map.remove();
    this.ngAfterViewInit(); 
    L.marker([al, log]).addTo(this.map);
   }



   getURI(id){
     this.mediaService.getUri(id).subscribe(
       data => {
         console.log(data);
        this.downloadFileSystem(data);
       },
       err => this.downloadFileSystem(err.error.text));
       

   }
   downloadFileSystem(fileName) {
    this.alertService.getFile(fileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');
        console.log("#####",response);
        this.saveFile(response.body, filename);

      },
      err=> {
        console.log("-------",err)
       });

  
    }
  

    saveFile(data: Blob, filename?: string){
      this.blob = new Blob([data], {type: 'image/jpeg'}); 
      let objectURL = URL.createObjectURL(this.blob);
      this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
     // fileSaver.saveAs(this.blob, filename);
    }
}
