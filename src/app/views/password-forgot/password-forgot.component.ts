import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActeurService } from '../../services/acteur.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {

  constructor(private router: Router, private actorService: ActeurService) { }

  ngOnInit() {
    
  }

  sendEmail(data){
  console.log(data);
  this.actorService.SendEmail(data.email).subscribe(
    data => console.log(data),
    err => console.log(err)
  )
  }

}
