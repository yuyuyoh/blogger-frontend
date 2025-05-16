import { Component, OnInit } from "@angular/core";
import { Category } from "../data/category";
import { CategoryService } from "../services/category.service";

@Component({
    selector: 'app-x', 
    templateUrl: './x.component.html',
    styleUrls: ['./x.component.css']
  })

export class XComponent implements OnInit {
    categories: Category[] = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.getAll().subscribe((categories) => {
            this.categories = categories;
        });
    }
    
}