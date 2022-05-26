import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url="http://localhost:8080/api/login";
  currentUserSubjet:BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    console.log("el servicio de autenticación está corriendo");
    this.currentUserSubjet= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
   }

   IniciarSesion(credenciales:any):Observable<any>{
     return this.http.post(this.url, credenciales).pipe(map(data=>{
       sessionStorage.setItem('currentUser', JSON.stringify(data));
       this.currentUserSubjet.next(data);
       return data;
     }))
   }

   get UsuarioAutenticado() {
     return this.currentUserSubjet.value;
   }
}