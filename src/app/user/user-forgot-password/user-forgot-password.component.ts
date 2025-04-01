import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {whitespaceValidator} from "../../category/category-create/category-create.component";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

  user?: User
  messageError?: string
  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required, whitespaceValidator()]),
    pin: new FormControl('', [Validators.required, whitespaceValidator()]),
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
      pin: this.userForm.value.pin,
    }
    this.userService.resetPassword(user).subscribe(rs => {
      this.user = rs
    }, error => {
      this.messageError = error.error.message
    });
  }

}
