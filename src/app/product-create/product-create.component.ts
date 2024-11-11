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
    description: new FormControl(''),
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
    let filename
    if (this.fileDetail != null) {
      let index = this.fileDetail.toString().indexOf("src")
      filename = this.fileDetail.toString().substring(index)
      console.log("nameFile: " + filename)
    }
    let price = this.productForm.value.price.replace(/,/g, '');
    let product = {
      productName: this.productForm.value.productName,
      price: price,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description,
      image: filename
    }
    console.log("Test: " + JSON.stringify(this.fileDetail))
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
      console.log(rs)
    }, error => {
      console.log("lỗi" + JSON.stringify(error))
    })
  }

  formatPrice() {
    const priceInput = document.getElementById('price');
    // @ts-ignore
    priceInput.addEventListener('input', (event) => {
      // @ts-ignore
      let value = event.target.value.replace(/,/g, ''); // Xóa dấu phẩy
      if (!isNaN(value) && value !== '') {
        value = Number(value).toLocaleString('en-US'); // Định dạng giá
      }
      // @ts-ignore
      event.target.value = value;
    });
  }
}
