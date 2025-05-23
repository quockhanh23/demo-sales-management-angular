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
import {environment} from "../../../environments/environment";

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
  messageErrorChangePassword?: string
  messageErrorUpdateUser?: string
  messageErrorAddress?: string
  role?: any
  updateUser = false;
  successMessage = ""

  changePasswordForm: FormGroup = this.formBuilder.group({
    oldPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    newPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    newPasswordConfirm: new FormControl('', [Validators.required, whitespaceValidator()]),
  });

  userUpdateForm: FormGroup = this.formBuilder.group({
    fullName: new FormControl('',),
    phone: new FormControl('',),
  });

  constructor(private userService: UserService,
              private addressService: AddressService,
              private orderPaymentService: OrderPaymentService,
              private formBuilder: FormBuilder) {
    environment.previousUrl = window.location.pathname;
    this.idUser = localStorage.getItem("id")
    this.role = localStorage.getItem("role")
  }

  ngOnInit(): void {
    if (this.idUser == null || this.idUser == "") return
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
    this.messageErrorChangePassword = undefined
    if (this.idUser == null || this.idUser == "") return
    let changePasswordObject = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.newPasswordConfirm,
    }
    this.userService.changePassword(changePasswordObject, this.idUser).subscribe(() => {
      this.successMessage = "Đổi mật khẩu thành công !"
      this.getSnackbar();
      this.changeToProfile();
    }, error => {
      this.messageErrorChangePassword = error.error.message
      console.log("Lỗi toChangePassword: ", JSON.stringify(error))
    })
  }

  toUpdateUser() {
    this.messageErrorUpdateUser = undefined
    if (this.userUpdateForm.value.fullName == '' && this.userUpdateForm.value.phone == '') return;
    if (this.idUser == null || this.idUser == "") return
    let updateUser = {
      fullName: this.userUpdateForm.value.fullName,
      phone: this.userUpdateForm.value.phone,
    }
    this.userService.updateInformation(updateUser, this.idUser).subscribe(rs => {
      this.successMessage = "Cập nhật thông tin thành công !"
      this.getSnackbar();
      this.changeToProfile();
      this.updateUser = false;
      this.user = rs
    }, error => {
      this.messageErrorUpdateUser = error.error.message
      console.log("Lỗi toUpdateUser: ", JSON.stringify(error))
    })
  }

  getSnackbar() {
    let x = document.getElementById('snackbar');
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
    if (this.idUser == null || this.idUser == "") return
    this.addressService.deleteAddress(this.idUser, idAddress).subscribe(() => {
      this.getAllAddressByUser(this.idUser)
    })
  }

  getInformation(idUser: any) {
    this.userService.getInformation(idUser).subscribe(rs => {
      this.user = rs
    })
  }

  getAllAddressByUser(idUser: any) {
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
    this.messageErrorAddress = undefined;
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

    this.addressService.createAddress(this.idUser, addressRequest).subscribe(() => {
      this.getAllAddressByUser(this.idUser)
    }, error => {
      this.messageErrorAddress = error.error.message
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

  openUpdateUser() {
    this.updateUser = true;
  }

  closeUpdateUser() {
    this.updateUser = false;
  }
}


