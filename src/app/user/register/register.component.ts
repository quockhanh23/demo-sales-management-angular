import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";
import {whitespaceValidator} from "../../category/category-create/category-create.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messageErrorRegister?: string
  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required, whitespaceValidator()]),
    password: new FormControl('', [Validators.required, whitespaceValidator()]),
    confirmPassword: new FormControl('', [Validators.required, whitespaceValidator()]),
    phone: new FormControl('', [Validators.required, whitespaceValidator()]),
    pin: new FormControl('', [Validators.required, whitespaceValidator()]),
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
      alert("Đăng ký thành công chuyển đến trang đăng nhâp")
      this.router.navigate(["/login"]).then();
    }, errorObject => {
      this.messageErrorRegister = errorObject.error.message
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
