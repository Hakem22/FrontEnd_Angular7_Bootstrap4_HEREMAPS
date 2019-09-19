import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isCollapsed: boolean[]=[false, false, false, false, false];

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    
    // console.log(event);
}

}
