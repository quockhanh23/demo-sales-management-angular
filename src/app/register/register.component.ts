import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phone: new FormControl(''),
    pin: new FormControl(''),
  });

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
  }

  register() {
    let userRequest = {} as User
    userRequest.username = this.userForm.value.username
    userRequest.password = this.userForm.value.password
    userRequest.confirmPassword = this.userForm.value.confirmPassword
    userRequest.phone = this.userForm.value.phone
    userRequest.pin = this.userForm.value.pin

    this.userService.register(userRequest).subscribe(() => {
      alert("đăng kí thành công chuyển đến trang đăng nhâp")
      this.router.navigate(["/login"]).then();
    }, errorObject => {
      console.log(errorObject.error)
      alert("Lỗi đăng kí: " + errorObject.error)
    })
  }

  getPreviousUrl() {
    if (environment.previousUrl == '') {
      return "/"
    } else {
      return environment.previousUrl
    }
  }
}
