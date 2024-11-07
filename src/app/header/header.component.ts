import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string | undefined

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.username = localStorage.getItem("user")
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']).then()
    window.location.reload()
  }
}
