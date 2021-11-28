import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/common/categories';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category:Categories=new Categories();
 

  constructor( private CategoryService:CategoryService , private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit(){

    if ( this.category.title == null || this.category.title.trim()== '' ) {
      this._snack.open("Title is required !!", '', { duration: 3000 });
      return;
    }


    this.CategoryService.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        console.log("Success ");
        Swal.fire('Success !!','Category is added successfuly ','success');
        
      },
      (error)=>{
        console.log("error");
        Swal.fire('Error !!','Server error ','error');
        
      }
    );
  }

}
