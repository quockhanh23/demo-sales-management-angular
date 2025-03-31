import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {UploadFileService} from "../../services/upload-file.service";
import {FileDetails} from "../../models/file-details";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category";
import {whitespaceValidator} from "../../category/category-create/category-create.component";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  categories?: Category[]
  fileDetail?: FileDetails
  created = false
  checkUploadImage = false
  checkFile = false
  uploadSuccess = false
  file!: File;
  fileUrl?: any

  productForm: FormGroup = this.formBuilder.group({
    productName: new FormControl('', [Validators.required, whitespaceValidator()]),
    price: new FormControl('', [Validators.required, whitespaceValidator()]),
    quantity: new FormControl('', [Validators.required,whitespaceValidator()]),
    description: new FormControl('', [Validators.required,whitespaceValidator()]),
    idCategory: new FormControl(null, [Validators.required,])
  });

  constructor(private userService: UserService,
              private productService: ProductService,
              private uploadFileService: UploadFileService,
              private categoryService: CategoryService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.checkFile = false;
    this.uploadSuccess = false;
    this.getAllCategory();
  }

  getAllCategory() {
    let categories = localStorage.getItem("categories")
    if (categories) {
      this.categories = JSON.parse(categories);
    } else {
      this.categoryService.getAllCategory().subscribe(rs => {
        this.categories = rs;
        if (this.categories != null && this.categories?.length > 0) {
          localStorage.setItem("categories", JSON.stringify(this.categories));
        }
      })
    }
  }

  createProduct() {
    this.uploadFile();
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
      image: filename,
      idCategory: this.productForm.value.idCategory,
    }
    console.log("Test: " + JSON.stringify(this.fileDetail))
    let idUser = localStorage.getItem("id")
    // @ts-ignore
    this.productService.createProduct(product, idUser).subscribe(() => {
      this.created = true
      setTimeout(() => {
        this.router.navigate(["/"]).then()
      }, 200)
    }, error => {
      console.log("lỗi createProduct:" + JSON.stringify(error))
    })
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    if (this.file != null) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.fileUrl = e.target?.result;
      };
      reader.readAsDataURL(this.file);
      this.checkFile = false;
      this.checkUploadImage = true
      this.uploadSuccess = true
    }
  }

  uploadFile() {
    if (this.file == null) {
      this.checkFile = true;
      return
    }
    this.uploadFileService.upload(this.file).subscribe(rs => {
      this.fileDetail = rs
      console.log(rs)
    }, error => {
      console.log("lỗi uploadFile:" + JSON.stringify(error))
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
