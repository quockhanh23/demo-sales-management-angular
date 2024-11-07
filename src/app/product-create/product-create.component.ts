import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {UploadfileService} from "../services/uploadfile.service";
import {FileDetails} from "../models/file-details";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  fileDetail?: FileDetails
  created = false
  checkUploadImage = false
  checkFile = false
  file!: File;

  productForm: FormGroup = this.formBuilder.group({
    productName: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private userService: UserService,
              private productService: ProductService,
              private uploadfileService: UploadfileService,
              private router: Router,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
  }

  createProduct() {
    let product = {
      productName: this.productForm.value.productName,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      image: this.fileDetail?.filename
    }
    let id = localStorage.getItem("id")
    // @ts-ignore
    this.productService.createProduct(product, id).subscribe(() => {
      this.created = true
      setTimeout(() => {
        this.router.navigate(["/"]).then()
      }, 200)
    })
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    if (this.file != null) {
      this.checkFile = false;
    }
  }

  uploadFile() {
    if (this.file == null) {
      this.checkFile = true;
      return
    }
    this.uploadfileService.upload(this.file).subscribe(rs => {
      this.fileDetail = rs
      this.checkUploadImage = true
      console.log("vào đây" + JSON.stringify(rs))
    }, error => {
      console.log("lỗi" + JSON.stringify(error))
    })
  }
}
