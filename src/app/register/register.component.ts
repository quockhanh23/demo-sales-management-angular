import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User | undefined

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
    let user = {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword,
      phone: this.userForm.value.phone,
      pin: this.userForm.value.pin,
    }
    // @ts-ignore
    this.userService.register(user).subscribe(rs => {
      alert("đăng kí thành công chuyển đến trang đăng nhâp")
      this.router.navigate(["/login"]).then();
    }, errorObject => {
      console.log(errorObject.error)
      alert("Lỗi đăng kí: " + errorObject.error)
    })
  }
}
