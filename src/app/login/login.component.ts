import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User

  userForm: FormGroup = this.formBuilder.group({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
  }

  login() {
    let user = {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
    }
    this.userService.login(user).subscribe(rs => {
      console.log("Vào hàm login")
      localStorage.setItem("user", user.username)
      alert("đăng nhập thành công")
      this.router.navigate(["/"]).then();
      this.reload()
    }, error => {
      alert("Lỗi đăng nhập" + error)
    })
    this.findByUsername(user.username)
    console.log("Kết thúc")
  }

  findByUsername(username: string) {
    this.userService.findByUsername(username).subscribe(rs => {
      console.log(JSON.stringify(rs))
      localStorage.setItem("id", rs.id)
    }, error => {
      console.log(error)
    })
  }

  reload() {
    setTimeout(() => {
      window.location.reload()
    }, 50)
  }
}
