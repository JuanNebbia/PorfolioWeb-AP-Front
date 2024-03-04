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
  public updateProject:Proyectos | undefined;
  public deleteProject:Proyectos | undefined;
  public loading:boolean = true;
  public bannerDisposition:string[] = ["left","right","left", "right","left", "right", "left", "right", "left", "right", "left", "right"]
  public techs = ['react', 'angular', 'bootstrap', 'handlebars', 'node', 'springboot', 'express', 'mongo', 'mysql', 'firebase']
  userLogged = this.authenticationService.getLoggedUser();
  public screenWidth:number = 0;  
  public screenHeight:number = 0;  
  displayGifModal:boolean = false
  currentGif:string | undefined


  constructor(private proyectosService:ProyectosService, private authenticationService:AuthenticationService) { }

  ngOnInit() {  
    this.getProyectos()
    this.screenWidth = window.innerWidth;  
    this.screenHeight = window.innerHeight;  
  }  

  openGif(gif:string):void {
    this.displayGifModal = true
    this.currentGif = gif
  }

  closeGifModal(event:MouseEvent):void {
    const clickedElement = event.target as HTMLElement
    if(clickedElement.classList.contains('close')){
      this.displayGifModal = false
    }
  }

  setStyle(i:number):any{
    let styles
    if(this.screenWidth > 768){
      styles = {
        'background': `linear-gradient(to ${this.bannerDisposition[i]}, ${this.proyectos[i].color} 50%, ${this.proyectos[i].color}88)`
      }
    } else {
      styles = {
        'background': `linear-gradient(to top, ${this.proyectos[i].color} 60%, ${this.proyectos[i].color}88)`
      }
    }
    return styles
  }

  public getProyectos():void{
    this.proyectosService.getProyectos().subscribe({
      next:(Response: Proyectos[]) =>{
        const orderedResponse = Response.sort((a:Proyectos, b:Proyectos) => {
          return +b.date - +a.date;
        });        
        this.proyectos = orderedResponse
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
    addForm.value.date = new Date(addForm.value.date)
    this.proyectosService.addProyectos(addForm.value)
  }

  public onUpdateProyectos(project:Proyectos){
    project.date = new Date(project.date)
    this.updateProject = project;
    document.getElementById("update-proyectos-form")?.click();
    this.proyectosService.updateProyectos(project)
  }

  public onDeleteProyectos(idProject:string):void{
    this.proyectosService.deleteProyectos(idProject)
  }

  public onOpenModal(mode:String, project?:Proyectos):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode ==="add"){
      button.setAttribute('data-target', '#addProjectModal')
    }
    else if(mode ==='delete'){
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal')
    }
    else if(mode ==='update'){
      this.updateProject=project;
      button.setAttribute('data-target', '#updateProjectModal')
      console.log(project);
    }
    container?.appendChild(button);
    button.click();
  }



}


