import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/models/informacion';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public informacion:Informacion | undefined;
  public loading:boolean = true;

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
        console.log(error.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}