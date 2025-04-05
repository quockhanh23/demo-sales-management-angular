import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categories?: Category[]
  sizeOfList = false;
  categoryForm: FormGroup = this.formBuilder.group({
    content: new FormControl('', [Validators.required, whitespaceValidator()]),
  });

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  createCategory() {
    let category = {
      content: this.categoryForm.value.content,
    }
    this.categoryService.createCategory(category).subscribe(() => {
      this.getAllCategory();
    })
  };

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(rs => {
      this.sizeOfList = rs.length < 5;
      this.categories = rs
      localStorage.setItem("categories", JSON.stringify(this.categories));
    })
  }
}

export function whitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = control.value.trim().length === 0;
    return isWhitespace ? {'whitespace': true} : null;
  };
}

