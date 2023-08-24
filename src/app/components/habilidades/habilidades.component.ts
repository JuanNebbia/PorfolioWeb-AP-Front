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
  public addSkill:Habilidades | undefined;
  public updateSkills:Habilidades | undefined;
  public deleteHabilidades:Habilidades | undefined;
  public itemToDelete: number | undefined;
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
    this.addSkill?.items.push(addForm.value.item)
    document.getElementById("add-habilidades-form")?.click();
    this.habilidadesService.addHabilidades(this.addSkill)
  }

  public onUpdateHabilidades(updateForm: NgForm){
    document.getElementById("update-habilidades-form")?.click();
    if(this.updateSkills){
      const newSkills: any = {
        id: updateForm.value.id,
        title: updateForm.value.title,
        items: []
      }
      Object.entries(updateForm.value).forEach(entry => {
        const [key, value] = entry;
        if(key !== 'id' && key !== 'title'){
          newSkills.items.push(value)
        }
      });
      this.habilidadesService.updateHabilidades(newSkills)
    }
  }

  public onDeleteHabilidades():void{
    if(this.itemToDelete && this.deleteHabilidades){
      this.deleteHabilidades.items.splice(this.itemToDelete, 1)
      this.habilidadesService.updateHabilidades(this.deleteHabilidades)
    }
  }

  public onOpenModal(mode:String, skill:Habilidades, item:number):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==="add"){
      this.addSkill = skill
      button.setAttribute('data-target', '#addSkillModal')
    }
    else if(mode ==='delete'){
      this.deleteHabilidades = skill;
      this.itemToDelete = item;
      button.setAttribute('data-target', '#deleteHabilidadesModal')
    }
    else if(mode ==='update'){
      this.updateSkills = skill;
      button.setAttribute('data-target', '#updateHabilidadesModal')
    }
    container?.appendChild(button);
    button.click();
  }



}