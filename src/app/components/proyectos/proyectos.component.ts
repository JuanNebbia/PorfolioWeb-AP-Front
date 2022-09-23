import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';

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

  constructor(private proyectosService:ProyectosService) { }

  ngOnInit(): void {
    this.getProyectoss()
  }

  public getProyectoss():void{
    this.proyectosService.getProyectos().subscribe({
      next:(Response: Proyectos[]) =>{
        this.proyectos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      },
      complete:()=>this.loading=false
    })
  }

  public getProyectos():void{
    this.proyectosService.getProyectos().subscribe({
      next:(Response: Proyectos[]) =>{
        this.proyectos=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onAddProyectos(addForm: NgForm){
    document.getElementById("add-proyectos-form")?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe({
      next: (response:Proyectos) =>{
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset;
      }
    })
  }

  public onUpdateProyectos(proyectos:Proyectos){
    this.updateProyectos=proyectos;
    document.getElementById("update-proyectos-form")?.click();
    this.proyectosService.updateProyectos(proyectos).subscribe({
      next: (response:Proyectos) =>{
        console.log(response);
        this.getProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  public onDeleteProyectos(idProyectos:number):void{
    this.proyectosService.deleteProyectos(idProyectos).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getProyectos();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
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


