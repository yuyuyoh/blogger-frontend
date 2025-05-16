import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../data/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-create',
  standalone: true,
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class PostCreateComponent implements OnInit {

  postForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      categoryId: ['', Validators.required],
      content: ['', [Validators.required, Validators.maxLength(2500)]]
    });

    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories', err)
    });
  }

  get f() {
    return this.postForm.controls;
  }

  isValid(fieldName: string): boolean {
  const field = this.postForm.get(fieldName);
  if (!field) {
    return false;
  }
  return field.valid && (field.dirty || field.touched);
}


  onSubmit(): void {
    if (this.postForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please review your post',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    this.postService.createPost(this.postForm.value).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Post Submitted Successfully',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        this.router.navigate(['/']);
      },
      error: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error creating post',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }
}
