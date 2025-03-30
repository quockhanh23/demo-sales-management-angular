import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductDTO} from "../../models/product-dto";
import {CommentService} from "../../services/comment.service";
import {Comment} from "../../models/comment";
import {StarService} from "../../services/star.service";
import {Star} from "../../models/star";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UploadFileService} from "../../services/upload-file.service";
import {FileDetails} from "../../models/file-details";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: ProductDTO | undefined
  comments: Comment[] | undefined
  stars: Star[] | undefined
  star: Star | undefined

  stars1: number = 0
  stars2: number = 0
  stars3: number = 0
  stars4: number = 0
  stars5: number = 0
  selected: any = -1
  rating: any
  check = false
  created = false
  isLoading: boolean = true;
  fileDetail?: FileDetails
  checkUploadImage = false
  checkFile = false
  file!: File;
  idProduct?: string | null
  idUser?: string | null

  checkUpdateProduct = false

  productForm: FormGroup = this.formBuilder.group({
    productName: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl(''),
  });

  commentForm: FormGroup = this.formBuilder.group({
    content: new FormControl(''),
  });

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private starService: StarService,
              private formBuilder: FormBuilder,
              private uploadFileService: UploadFileService,
              private productService: ProductService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.detailProduct();
    this.selected = -1;
    console.log("id user : " + this.idUser)
  }

  openUpdateForm() {
    this.checkUpdateProduct = true;
  }

  closeUpdateForm() {
    this.checkUpdateProduct = false;
  }

  updateProduct() {
    let product = {
      productName: this.productForm.value.productName,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description,
      image: this.fileDetail?.filename
    }
    this.productService.updateProduct(product, this.idUser, this.idProduct, "ACTIVE").subscribe(() => {
      this.detailProduct()
      this.checkUpdateProduct = false;
    })
  }

  getStarValue(value: any) {
    this.selected = value;
    console.log("selected: " + value)
  }

  detailProduct() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = param.get('id')
      this.idProduct = id;
      this.productService.detailProduct(id).subscribe(rs => {
        this.product = rs;
        if (this.product?.image != null) {
          console.log("Ảnh: " + this.product?.image)
          this.checkUploadImage = true
          console.log(this.checkUploadImage)
        }
        this.productForm = new FormGroup({
          productName: new FormControl(this.product.productName),
          price: new FormControl(this.product.price),
          quantity: new FormControl(this.product.quantity),
          image: new FormControl(this.product.image),
          description: new FormControl(this.product.description),
        });
      })
      this.getAllStarByProduct(id)
      this.getAllStarByProductAndUser()
      this.getAllCommentByProduct()
      this.isLoading = false;
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
    this.uploadFileService.upload(this.file).subscribe(rs => {
      this.fileDetail = rs
      this.checkUploadImage = true
      console.log("vào đây" + JSON.stringify(rs))
    }, error => {
      console.log("Lỗi uploadFile: " + JSON.stringify(error))
    })
  }

  createComment() {
    let commentDTO = {
      content: this.commentForm.value.content,
      idUser: this.idUser,
      idProduct: this.idProduct
    }
    // @ts-ignore
    this.commentService.createComment(commentDTO).subscribe(() => {
      this.getAllCommentByProduct()
      this.getAllStarByProductAndUser()
      if (this.selected != -1) {
        console.log("selected: ")
        console.log(this.selected != -1)
        this.createStar()
        this.rating = this.selected
        console.log("rating: " + this.rating)
        this.checkStar(this.rating);
      }
    }, error => {
      console.log("Lỗi createComment: " + error)
    })
    console.log("id product: " + this.idProduct)
  }

  createStar() {
    this.starService.create(this.idProduct, this.idUser, this.selected).subscribe(() => {
      this.created = true;
    })
  }

  getAllStarByProductAndUser() {
    this.starService.getAllStarByProductAndUser(this.idProduct, this.idUser).subscribe(rs => {
      this.star = rs
      this.rating = this.star?.numberOfStars
      if (this.rating === '1' || this.rating === '2'
        || this.rating === '3' || this.rating === '4' || this.rating === '5') this.check = true
    })
    console.log("rating from getAllStarByProductAndUser: " + this.rating)
  }

  getAllCommentByProduct() {
    this.commentService.getAllCommentByProduct(this.idProduct).subscribe(rs => {
      this.comments = rs;
    })
  }

  checkStar(rating: any) {
    this.check = this.selected != -1 && rating != null;
  }

  getAllStarByProduct(id: any) {
    this.starService.getAllStarByProduct(id).subscribe(rs => {
      this.stars = rs;
      console.log("vào đây: " + this.stars.length)
      for (let i = 0; i < this.stars.length; i++) {
        console.log(this.stars[i])
        if (this.stars[i].numberOfStars === '1') {
          this.stars1 = this.stars1 + 1;
        }
        if (this.stars[i].numberOfStars === '2') {
          this.stars2 = this.stars2 + 1;
        }
        if (this.stars[i].numberOfStars === '3') {
          this.stars3 = this.stars3 + 1;
        }
        if (this.stars[i].numberOfStars === '4') {
          this.stars4 = this.stars4 + 1;
        }
        if (this.stars[i].numberOfStars === '5') {
          this.stars5 = this.stars5 + 1;
        }
      }
    })
  }

  getAllStar() {
    setTimeout(() => {
      this.getAllStarByProduct(this.idProduct)
    }, 500)
  }

  getPreviousUrl() {
    if (environment.previousUrl == '') {
      return "/"
    } else {
      return environment.previousUrl
    }
  }
}
