import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private apiServerUrl = "https://porfolio-web-ap.herokuapp.com"

  constructor(private firestore: Firestore) { }

  public getProyectos():Observable<Proyectos[]>{
    const proyectosRef = collection(this.firestore, 'proyectos')
    return collectionData(proyectosRef, {idField: 'id'}) as Observable<Proyectos[]>
  }

  // public addProyectos(proyectos:Proyectos):Observable<Proyectos>{
  //   return this.http.post<Proyectos>(`${this.apiServerUrl}/proyectos/add`, proyectos);
  // }

  // public updateProyectos(proyectos:Proyectos): Observable<Proyectos>{
  //   return this.http.put<Proyectos>(`${this.apiServerUrl}/proyectos/update`, proyectos);
  // }

  // public deleteProyectos(proyectosId:number): Observable<void>{
  //   return this.http.delete<void>(`${this.apiServerUrl}/proyectos/delete/${proyectosId}`);
  // }
}