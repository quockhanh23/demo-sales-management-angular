import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user?: User
  idUser: any

  constructor(private userService: UserService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getInformation(this.idUser)
  }

  getInformation(idUser: any) {
    this.userService.getInformation(idUser).subscribe(rs => {
      this.user = rs
    })
  }
}
