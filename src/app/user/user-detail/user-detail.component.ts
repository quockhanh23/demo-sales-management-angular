import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/address";
import {LocationDTO} from "../../models/location-dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderPayment} from "../../models/order-payment";
import {OrderPaymentService} from "../../services/order-payment.service";
import {whitespaceValidator} from "../../category/category-create/category-create.component";

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
  ORDER_SUCCESSFUL = 'ORDER_SUCCESSFUL'
  ORDER_CONFIRM = 'ORDER_CONFIRM'
  ORDER_CANCELLED = 'ORDER_CANCELLED'
  ORDER_RETURN = 'ORDER_RETURN'
  DELIVERY_SUCCESSFUL = 'DELIVERY_SUCCESSFUL'

  changePasswordForm: FormGroup = this.formBuilder.group({
    oldPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    newPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    newPasswordConfirm: new FormControl('', [Validators.required, whitespaceValidator()]),
  });

  constructor(private userService: UserService,
              private addressService: AddressService,
              private orderPaymentService: OrderPaymentService,
              private formBuilder: FormBuilder) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getInformation(this.idUser)
    this.getAllAddressByUser(this.idUser)
    this.getAllProvince();
    this.getAllOrderPayment('');
  }

  getAllOrderPayment(status: string) {
    this.orderPaymentService.getAllOrderPaymentByIdUserAndOrderPaymentStatus
    (this.idUser, status).subscribe(rs => {
      this.orderPayments = rs;
    })
  }

  toChangePassword() {
    if (this.idUser == null || this.idUser == "") return
    let changePasswordObject = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.newPasswordConfirm,
    }
    this.userService.changePassword(changePasswordObject, this.idUser).subscribe(() => {
      this.getSnackbar();
      this.changeToProfile();
    }, error => {
      console.log("Lỗi toChangePassword: ", JSON.stringify(error))
    })
  }

  getSnackbar() {
    let x = document.getElementById("snackbar");
    // @ts-ignore
    x.className = "show";
    setTimeout(function () {
      // @ts-ignore
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  selectAddress(idAddress: any) {
    this.addressService.selectAddress(this.idUser, idAddress).subscribe(() => {
      this.getAllAddressByUser(this.idUser)
    })
  }

  deleteAddress(idAddress: any) {
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


