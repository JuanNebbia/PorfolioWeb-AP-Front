import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  form:FormGroup;

  constructor(private formBuilder:FormBuilder, private AuthenticationService:AuthenticationService, private ruta:Router) { 
    this.form=this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]]
      }
    )
  }
    

  ngOnInit(): void {
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.AuthenticationService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA" + JSON.stringify(data));
      this.ruta.navigate(['/porfolio']);
    },error=>alert("No se pudo conectar :(")
      )
  }
}
