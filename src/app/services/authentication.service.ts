import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
isitLogged:boolean=false;

  constructor(private auth:AngularFireAuth){}

  async register(email:string,password:string){
    try{
      return await this.auth.createUserWithEmailAndPassword(email,password)
    }
    catch(err){
      console.log("error en register: ", err);
      return null;
    }
  }


 async login(email:string,password:string){
    try{
      return await this.auth.signInWithEmailAndPassword(email,password)
    }
    catch(err){
      console.log("error en login: ", err);
      return null;
    }
 }

 getLoggedUser(){
  return this.auth.authState;
 }

 logout(){
   this.auth.signOut();
 }

}