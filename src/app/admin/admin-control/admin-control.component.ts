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
  heightDiv = 'height: 400px'

  constructor(private adminService: AdminService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    if (this.idUser == null || this.idUser == "") return
    this.getAllUser();
  }

  getAllUser() {
    this.adminService.getAllUser(this.idUser).subscribe(result => {
      this.userDTOS = result
      if (result?.length > 5) {
        let px = 15 * result?.length
        this.heightDiv = 'height' + px + 'px'
      }
    })
  }
}
