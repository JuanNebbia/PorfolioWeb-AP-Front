import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educaciones:Educacion[]=[];
  public updateEducacion:Educacion | undefined;
  public deleteEducacion:Educacion | undefined;
  public loading:boolean = true;
  userLogged = this.authenticationService.getLoggedUser();

  constructor(private educacionService:EducacionService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getEducaciones()
  }

  public getEducaciones():void{
    this.educacionService.getEducacion().subscribe({
      next:(Response: Educacion[]) =>{
        this.educaciones=Response;
        this.loading = false;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onAddEducacion(addForm: NgForm){
    document.getElementById("add-educacion-form")?.click();
    this.educacionService.addEducacion(addForm.value)
  }

  public onUpdateEducacion(educacion:Educacion){
    this.updateEducacion=educacion;
    document.getElementById("update-educacion-form")?.click();
    this.educacionService.updateEducacion(educacion)
  }

  public onDeleteEducacion(idEducacion:string):void{
    this.educacionService.deleteEducacion(idEducacion)
  }

  public onOpenModal(mode:String, educacion?:Educacion):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==="add"){
      button.setAttribute('data-target', '#addEducacionModal')
    }
    else if(mode ==='delete'){
      this.deleteEducacion=educacion;
      button.setAttribute('data-target', '#deleteEducacionModal')
    }
    else if(mode ==='update'){
      this.updateEducacion=educacion;
      button.setAttribute('data-target', '#updateEducacionModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
