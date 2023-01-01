import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/models/informacion';
import { HeaderService } from 'src/app/services/header.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  
  public informacion:Informacion | undefined;
  public updateInformacion:Informacion | undefined;
  public loading:boolean = true;
  userLogged = this.authenticationService.getLoggedUser();

  constructor(private headerService:HeaderService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getInformacion();
  }

  public getInformacion():void{
    this.headerService.getInformacion().subscribe({
      next: (response: Informacion)=>{
        this.informacion = response;
        this.loading=false
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }});
  }

  public onUpdateInformacion(informacion:Informacion){
    this.updateInformacion=informacion;
    document.getElementById("update-informacion-form")?.click();
    this.headerService.updateInformacion(informacion)
  }


  public onOpenModal(informacion?:Informacion):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    this.updateInformacion=informacion;
    button.setAttribute('data-target', '#updateSobreMiModal');
    container?.appendChild(button);
    button.click();
  }
}