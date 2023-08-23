import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/services/educacion.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Timestamp } from 'firebase/firestore';

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
  months:String[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic']

  constructor(private educacionService:EducacionService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getEducation()
  }

  public getEducation():void{
    this.educacionService.getEducacion().subscribe({
      next:(Response: Educacion[]) =>{
        const orderedResponse = Response.sort((a:Educacion, b:Educacion) => {
          return +b.dateStart - +a.dateStart;
        });   
        const finalResponse = orderedResponse.map( item => {
          
          item.dateStart = `${this.months[item.dateStart.toDate().getMonth()]} ${item.dateStart.toDate().getFullYear()}`
          if(item.dateEnd){
            item.dateEnd = `${this.months[item.dateEnd.toDate().getMonth()]} ${item.dateEnd.toDate().getFullYear()}`
          }else{
            item.dateEnd = 'En Curso'
          }
          return item
        })
        this.educaciones = finalResponse;
        this.loading = false;
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public onAddEducation(addForm: NgForm){
    document.getElementById("add-educacion-form")?.click();
    addForm.value.dateStart = new Date(addForm.value.dateStart)
    addForm.value.dateEnd = new Date(addForm.value.dateEnd)
    const educationData = addForm.value
    this.educacionService.addEducacion(educationData)
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
