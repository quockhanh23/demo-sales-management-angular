import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

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
              private formBuilder: FormBuilder) {
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
  }

  login() {
    let user = {
      username: this.userForm.value.username,
      password: this.userForm.value.password,
    }
    this.userService.login(user).subscribe(() => {
      console.log("Vào hàm login")
      localStorage.setItem("user", user.username)
      this.findByUsername(user.username)
    }, error => {
      console.log(error)
    })
    setTimeout(() => {
      this.router.navigate(["/"]).then();
    }, 300)
  }

  findByUsername(username: string) {
    this.userService.findByUsername(username).subscribe(rs => {
      console.log(JSON.stringify(rs))
      localStorage.setItem("id", rs.id)
      localStorage.setItem("role", rs.role)
    }, error => {
      console.log(error)
    })
  }

  reload() {
    setTimeout(() => {
      window.location.reload()
    }, 50)
  }

  getPreviousUrl() {
    if (environment.previousUrl == '' || environment.previousUrl == "/login") {
      return "/"
    } else {
      return environment.previousUrl
    }
  }
}
