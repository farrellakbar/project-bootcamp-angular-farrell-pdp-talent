import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-dashboard',  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthenticationService

  ) { }
  ngOnInit(): void {
    var app = this.authService.token
    console.log(app)
  }
}
