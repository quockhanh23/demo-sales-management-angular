import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username?: any

  constructor(private router: Router) {
    const instanceName = this.constructor.name;
    console.log('Tên instance của component:', instanceName);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("user")
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']).then()
  }
}
