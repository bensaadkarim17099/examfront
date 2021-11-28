import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  };

  constructor(private snack:MatSnackBar ,private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    
    if(this.loginData.username.trim()=='' || this.loginData.username==null){

      this.snack.open("Username is required !! ","",{
        duration:3000,
      });
      return;
 }

      if(this.loginData.password.trim()=='' || this.loginData.password==null){

        this.snack.open("password is required !! ","",{
          duration:3000,
        });
        return;
    }
 
    // request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
        // login ....
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);
            // redirect ... ADMIN dashboard
            //redirect ... NORMAL dashboard
            if(this.loginService.getUserRole()=="ADMIN"){
              //admin dashboard
              this.router.navigate(['admin']);
              this.loginService.loginStatusSub.next(true);
            }else if(this.loginService.getUserRole()=="NORMAL"){
              //user dashboard
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSub.next(true);
            }else{
              //login pages
              this.loginService.logout();
              
            }
            
          }
        );
      },
      (error)=>{
        console.log("Error !");
        console.log(error);
        this.snack.open("Invalid Details !! Try again","",{
          duration:3000,
        })
        
      }
    );

  }
}
