import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {UserDTO} from "../models/user-dto";

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

  user!: UserDTO

  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    pin: new FormControl(''),
  });

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  sendPinCode() {
    let user = {
      username: this.userForm.value.username,
      newPassword: this.userForm.value.newPassword,
      confirmPassword: this.userForm.value.confirmPassword,
      pin: this.userForm.value.pin,
    }
    this.userService.resetPassword(user).subscribe(() => {

    });
  }

}
