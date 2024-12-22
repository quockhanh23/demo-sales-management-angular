import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {UserDTO} from "../../models/user-dto";

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export class AdminControlComponent implements OnInit {

  userDTOS?: UserDTO[]
  idUser: any

  constructor(private adminService: AdminService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.adminService.getAllUser(this.idUser).subscribe(rs => {
      this.userDTOS = rs
    })
  }
}
