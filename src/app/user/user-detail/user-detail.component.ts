import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/address";
import {LocationDTO} from "../../models/location-dto";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrderPayment} from "../../models/order-payment";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user?: User
  address?: Address[]
  orderPayments?: OrderPayment[]
  idUser: any
  checkProfile = true;
  checkOrder = false;
  changePassword = false;
  checkAddress = false;
  newAddress = false;
  responseDataProvince?: LocationDTO
  responseDataDistrict?: LocationDTO

  responseDataWards?: LocationDTO
  selectedProvince?: string
  selectedDistrict?: string

  userForm: FormGroup = this.formBuilder.group({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    newPasswordConfirm: new FormControl(''),
  });

  constructor(private userService: UserService,
              private addressService: AddressService,
              private formBuilder: FormBuilder) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getInformation(this.idUser)
    this.getAllAddressByUser(this.idUser)
    this.getAllProvince();
  }

  getAllOrderPayment() {

  }

  toChangePassword() {
  }

  selectAddress(idAddress: any) {
    console.log("selectAddress")
    this.addressService.selectAddress(this.idUser, idAddress).subscribe(() => {
      this.getAllAddressByUser(this.idUser)
    })
  }

  deleteAddress(idAddress: any) {
    console.log("deleteAddress")
    this.addressService.deleteAddress(this.idUser, idAddress).subscribe(() => {
      this.getAllAddressByUser(this.idUser)
    })
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

  createAddress() {
    const provinceId = (document.getElementById("1") as HTMLSelectElement).value;
    const districtId = (document.getElementById("2") as HTMLSelectElement).value;
    const wardsId = (document.getElementById("3") as HTMLSelectElement).value;
    let address = (document.getElementById("4") as HTMLSelectElement).value;
    let province;
    let district;
    let wards;
    if (this.responseDataProvince != null) {
      for (let i = 0; i < this.responseDataProvince?.data.length; i++) {
        if (this.responseDataProvince?.data[i].id == provinceId) {
          province = this.responseDataProvince?.data[i].name
          break
        }
      }
    }
    if (this.responseDataDistrict != null) {
      for (let i = 0; i < this.responseDataDistrict?.data.length; i++) {
        if (this.responseDataDistrict?.data[i].id == districtId) {
          district = this.responseDataDistrict?.data[i].name
          break
        }
      }
    }
    if (this.responseDataWards != null) {
      for (let i = 0; i < this.responseDataWards?.data.length; i++) {
        if (this.responseDataWards?.data[i].id == wardsId) {
          wards = this.responseDataWards?.data[i].name
          break
        }
      }
    }

    let addressRequest: Address = {
      id: '',
      address: address,
      province: province,
      district: district,
      ward: wards,
      idUser: this.idUser
    };

    console.log("addressRequest: " + JSON.stringify(addressRequest))
    this.addressService.createAddress(this.idUser, addressRequest).subscribe(() => {
      this.ngOnInit()
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
