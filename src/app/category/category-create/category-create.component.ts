import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Category} from "../../models/category";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category?: Category[]
  categoryForm: FormGroup = this.formBuilder.group({
    content: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  createCategory() {

  };

  getAllCategory() {

  }

}
