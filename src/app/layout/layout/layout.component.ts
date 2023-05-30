import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public txtform?: string = "";
  public txtmodule: string = "";

  constructor(private route: ActivatedRoute, private router: Router) {    
    try {
      this.txtmodule = this.route.snapshot?.data['title'];
      this.txtform= this.route.firstChild?.firstChild?.snapshot.data['title']
    } catch (error) {
      //Intentional
    }
   
  }

  ngOnInit(): void {
    try {
      this.router.events.subscribe((val) => {
        if ((val instanceof ActivationStart)) {
          if (val?.snapshot?.data['title']) {
            if (val?.snapshot.component == null) {
              this.txtmodule = val.snapshot.data['title'];
            } else {
              this.txtform = val.snapshot.data['title'];
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }



}
