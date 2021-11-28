import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from 'src/app/common/categories';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _cat:CategoryService,private  _snack:MatSnackBar) { }
categories:Categories[]=[];
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        console.log(data);
        this.categories=data;
        
      },
      (error)=>{

        this._snack.open("Error in loading categories from server! ","",{duration:3000});
      }
    );
  }

}
