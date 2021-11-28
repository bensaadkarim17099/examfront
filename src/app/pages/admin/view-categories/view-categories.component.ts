import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Categories } from 'src/app/common/categories';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: Categories[] = [];


  constructor(private _category:CategoryService) { }

  ngOnInit(): void {

    this._category.categories().subscribe(
      (data:any)=>{
        
        
        this.categories=data;
        console.log(this.categories);

      },
      (error)=>{
        console.log("Error");
        Swal.fire("Error !!","error loading data","error");
        
      });
  }

}
