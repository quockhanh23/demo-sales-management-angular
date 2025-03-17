import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {AddressService} from "../services/address.service";
import {Address} from "../models/address";
import {LocationDTO} from "../models/location-dto";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user?: User
  address?: Address[]
  idUser: any
  checkProfile = true;
  checkOrder = false;
  changePassword = false;
  checkAddress = false;
  newAddress = false;
  responseDataProvince?: LocationDTO
  responseDataDistrict?: LocationDTO
  responseDataWards?: LocationDTO
  doneProvince = false;
  doneDistrict = false;
  selectedProvince?: string
  selectedDistrict?: string

  constructor(private userService: UserService,
              private addressService: AddressService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getInformation(this.idUser)
    this.getAllAddressByUser(this.idUser)
    this.getAllProvince();
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

  getAllProvince() {
    this.addressService.getAllProvince().subscribe(rs => {
      this.responseDataProvince = rs;
    })
  }

  getAllDistrictByIdProvince() {
    this.responseDataWards = undefined;
    this.responseDataDistrict = undefined;
    const id = (document.getElementById("1") as HTMLSelectElement).value;
    this.addressService.getAllDistrictByIdProvince(id).subscribe(rs => {
      this.responseDataDistrict = rs;
    })
  }

  getAllWardsByIdDistrict() {
    const id = (document.getElementById("2") as HTMLSelectElement).value;
    this.addressService.getAllWardsByIdDistrict(id).subscribe(rs => {
      this.responseDataWards = rs;
    })
  }

  changeToProfile() {
    this.checkProfile = true;
    this.checkOrder = false;
    this.changePassword = false;
    this.checkAddress = false;
  }

  changeToOrder() {
    this.checkProfile = false;
    this.checkOrder = true;
    this.changePassword = false;
    this.checkAddress = false;
  }

  changeToPassword() {
    this.checkProfile = false;
    this.checkOrder = false;
    this.changePassword = true;
    this.checkAddress = false;
  }

  changeToAddress() {
    this.checkProfile = false;
    this.checkOrder = false;
    this.changePassword = false;
    this.checkAddress = true;
  }

  openNewAddress() {
    this.newAddress = true;
  }

  closeNewAddress() {
    this.newAddress = false;
  }
}
