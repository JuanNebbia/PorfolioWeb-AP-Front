import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/models/informacion';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public informacion:Informacion | undefined;

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

}
