import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {AddressService} from "../services/address.service";
import {Address} from "../models/address";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user?: User
  address?: Address[]
  idUser: any

  constructor(private userService: UserService,
              private addressService: AddressService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getInformation(this.idUser)
  }

  getInformation(idUser: any) {
    if (idUser == null) return;
    this.userService.getInformation(idUser).subscribe(rs => {
      this.user = rs
    })
  }

  getAllAddressByUser(idUser: any) {
    if (idUser == null) return;
    this.addressService.getAllAddressByUser(idUser).subscribe(rs => {
      this.address = rs
    })
  }
}
