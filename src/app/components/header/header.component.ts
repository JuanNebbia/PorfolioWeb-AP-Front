import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Informacion } from 'src/app/models/informacion';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public informacion:Informacion | undefined;
  public updateInfo: Informacion | undefined;
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
        this.loading = false
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      },
      complete: () => this.loading = false
    });
  }

  
  public onOpenModal():void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
      this.updateInfo=this.informacion;
      button.setAttribute('data-target', '#updateHabilidadesModal')
    container?.appendChild(button);
    button.click();
  }
 
  public onUpdateInfo(informacion:Informacion){
    this.updateInfo = informacion;
    document.getElementById("update-info-form")?.click();
    this.headerService.updateInformacion(informacion)
  }


}