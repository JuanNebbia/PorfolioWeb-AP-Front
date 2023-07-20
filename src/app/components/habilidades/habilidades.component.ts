import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidades } from 'src/app/models/habilidades';
import { HabilidadesService } from 'src/app/services/habilidades.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HabilidadesComponent implements OnInit {
  
  public habilidades:Habilidades[]=[];
  public updateHabilidades:Habilidades | undefined;
  public deleteHabilidades:Habilidades | undefined;
  public loading:boolean = true;
  userLogged = this.authenticationService.getLoggedUser();

  constructor(private habilidadesService:HabilidadesService, private authenticationService:AuthenticationService) { }
  
  ngOnInit(): void {
    this.getHabilidades()
  }

  public getHabilidades():void{
    this.habilidadesService.getHabilidades().subscribe({
      next:(Response: Habilidades[]) =>{
        const skillOrder:string[] = ['General', 'Frontend', 'Backend']
        const orderedSkills = Response.sort((a, b) => {
          const indexA = skillOrder.indexOf(a.title);
          const indexB = skillOrder.indexOf(b.title);
        
          return indexA - indexB;
        });
        this.habilidades = orderedSkills;
        this.loading = false
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onAddHabilidades(addForm: NgForm){
    document.getElementById("add-habilidades-form")?.click();
    this.habilidadesService.addHabilidades(addForm.value)
  }

  public onUpdateHabilidades(habilidades:Habilidades){
    this.updateHabilidades=habilidades;
    document.getElementById("update-habilidades-form")?.click();
    this.habilidadesService.updateHabilidades(habilidades)
  }

  public onDeleteHabilidades(id:string):void{
    this.habilidadesService.deleteHabilidades(id)
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