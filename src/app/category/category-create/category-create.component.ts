import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categories?: Category[]
  categoryForm: FormGroup = this.formBuilder.group({
    content: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  createCategory() {
    this.getAllCategory();
  };

  getAllCategory() {

  }

}
