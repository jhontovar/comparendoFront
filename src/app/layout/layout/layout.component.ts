import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    try {
      this.router.events.subscribe((val) => {
        if ((val instanceof ActivationStart)) {
        }
      });
    } catch (error) {
    }
  }



}
