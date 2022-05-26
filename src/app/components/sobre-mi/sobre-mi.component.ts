import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/models/informacion';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  
  public informacion:Informacion | undefined;
  public updateInformacion:Informacion | undefined;

  constructor(private headerService:HeaderService) { }

  ngOnInit(): void {
    this.getInformacion();
  }

  public getInformacion():void{
    this.headerService.getInformacion().subscribe({
      next: (response: Informacion)=>{
        this.informacion = response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

  public onUpdateInformacion(informacion:Informacion){
    this.updateInformacion=informacion;
    document.getElementById("update-informacion-form")?.click();
    this.headerService.updateInformacion(informacion).subscribe({
      next: (response:Informacion) =>{
        console.log(response);
        this.getInformacion();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
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