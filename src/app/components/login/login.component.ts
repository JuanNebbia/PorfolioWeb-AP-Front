import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  userLogged = this.authenticationService.getLoggedUser();

  usuario={
    email: '',
    password:''
  }

  constructor(private authenticationService:AuthenticationService){}

  register(){
    console.log(this.usuario)
    const{email,password}=this.usuario;
    this.authenticationService.register(email,password).then(res=>{
      console.log("se regitró", res);
    })
  }
  
  login():void{
    console.log(this.usuario)
    const{email,password}=this.usuario;
    this.authenticationService.login(email,password).then(res=>{
      console.log("se logueó", res);
    })
  }

  getLoggedUser(){
    this.authenticationService.getLoggedUser().subscribe(res=>{
      console.log(res?.email);
    });
  }

  logout(){
    this.authenticationService.logout();
    console.log("salió");
  }


}
