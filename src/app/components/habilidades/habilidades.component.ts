import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidades } from 'src/app/models/habilidades';
import { HabilidadesService } from 'src/app/services/habilidades.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})

export class HabilidadesComponent implements OnInit {
  
  public habilidades:Habilidades[]=[];
  public updateHabilidades:Habilidades | undefined;
  public deleteHabilidades:Habilidades | undefined;
  public loading:boolean = true;

  constructor(private habilidadesService:HabilidadesService) { }


  
  ngOnInit(): void {
    this.getHabilidadess()
  }

  public getHabilidadess():void{
    this.habilidadesService.getHabilidades().subscribe({
      next:(Response: Habilidades[]) =>{
        this.habilidades=Response;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      },
      complete: () => this.loading = false
    })
  }

  public getHabilidades():void{
    this.habilidadesService.getHabilidades().subscribe({
      next:(Response: Habilidades[]) =>{
        this.habilidades=Response;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onAddHabilidades(addForm: NgForm){
    document.getElementById("add-habilidades-form")?.click();
    this.habilidadesService.addHabilidades(addForm.value).subscribe({
      next: (response:Habilidades) =>{
        console.log(response);
        this.getHabilidades();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
        addForm.reset;
      }
    })
  }

  public onUpdateHabilidades(habilidades:Habilidades){
    this.updateHabilidades=habilidades;
    document.getElementById("update-habilidades-form")?.click();
    this.habilidadesService.updateHabilidades(habilidades).subscribe({
      next: (response:Habilidades) =>{
        console.log(response);
        this.getHabilidades();
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onDeleteHabilidades(idHabilidades:number):void{
    this.habilidadesService.deleteHabilidades(idHabilidades).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getHabilidades();
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onOpenModal(mode:String, habilidades?:Habilidades):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==="add"){
      button.setAttribute('data-target', '#addHabilidadesModal')
    }
    else if(mode ==='delete'){
      this.deleteHabilidades=habilidades;
      button.setAttribute('data-target', '#deleteHabilidadesModal')
    }
    else if(mode ==='update'){
      this.updateHabilidades=habilidades;
      button.setAttribute('data-target', '#updateHabilidadesModal')
    }
    container?.appendChild(button);
    button.click();
  }



}