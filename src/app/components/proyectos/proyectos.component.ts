import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  public proyectos:Proyectos[]=[];
  public updateProyectos:Proyectos | undefined;
  public deleteProyectos:Proyectos | undefined;
  public loading:boolean = true;
  userLogged = this.authenticationService.getLoggedUser();

  constructor(private proyectosService:ProyectosService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getProyectoss()
  }

  public getProyectoss():void{
    this.proyectosService.getProyectos().subscribe({
      next:(Response: Proyectos[]) =>{
        this.proyectos=Response;
        this.loading=false
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>this.loading=false
    })
  }

  public onAddProyectos(addForm: NgForm){
    document.getElementById("add-proyectos-form")?.click();
    this.proyectosService.addProyectos(addForm.value)
  }

  public onUpdateProyectos(proyectos:Proyectos){
    this.updateProyectos=proyectos;
    document.getElementById("update-proyectos-form")?.click();
    this.proyectosService.updateProyectos(proyectos)
  }

  public onDeleteProyectos(idProyectos:string):void{
    this.proyectosService.deleteProyectos(idProyectos)
  }

  public onOpenModal(mode:String, proyectos?:Proyectos):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==="add"){
      button.setAttribute('data-target', '#addProyectosModal')
    }
    else if(mode ==='delete'){
      this.deleteProyectos=proyectos;
      button.setAttribute('data-target', '#deleteProyectosModal')
    }
    else if(mode ==='update'){
      this.updateProyectos=proyectos;
      button.setAttribute('data-target', '#updateProyectosModal')
    }
    container?.appendChild(button);
    button.click();
  }



}


