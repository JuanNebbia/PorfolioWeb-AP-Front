import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  
  public experiencias:Experiencia[]=[];
  public updateExperiencia:Experiencia | undefined;
  public deleteExperiencia:Experiencia | undefined;
  public loading:boolean = true;
  userLogged = this.authenticationService.getLoggedUser();

  constructor(private experienciaService:ExperienciaService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getExperiencias()
  }

  public getExperiencias():void{
    this.experienciaService.getExperiencia().subscribe({
      next:(Response: Experiencia[]) =>{
        this.experiencias=Response;
        this.loading = false;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onAddExperiencia(addForm: NgForm){
    document.getElementById("add-experiencia-form")?.click();
    this.experienciaService.addExperiencia(addForm.value)
  }

  public onUpdateExperiencia(experiencia:Experiencia){
    this.updateExperiencia=experiencia;
    document.getElementById("update-experiencia-form")?.click();
    this.experienciaService.updateExperiencia(experiencia)
  }

  public onDeleteExperiencia(id:string):void{
    this.experienciaService.deleteExperiencia(id)
  }

  public onOpenModal(mode:String, experiencia?:Experiencia):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==="add"){
      button.setAttribute('data-target', '#addExperienciaModal')
    }
    else if(mode ==='delete'){
      this.deleteExperiencia=experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal')
    }
    else if(mode ==='update'){
      this.updateExperiencia=experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal')
    }
    container?.appendChild(button);
    button.click();
  }


}
