import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private proyectosRef = collection(this.firestore, 'proyectos')

  constructor(private firestore: Firestore) { }

  public getProyectos():Observable<Proyectos[]>{
    return collectionData(this.proyectosRef, {idField: 'id'}) as Observable<Proyectos[]>
  }

  public addProyectos(proyectos:Proyectos): Promise<Object>{
    return addDoc(this.proyectosRef, proyectos)
  }

  public updateProyectos(proyectos:Proyectos): Promise<void>{
    const proyectDocRef = doc(this.firestore, 'proyectos', proyectos.id)
    return updateDoc(proyectDocRef, {...proyectos})
  }

  public deleteProyectos(id: string): Promise<void>{
    const proyectDocRef = doc(this.firestore, 'proyectos', id)
    return deleteDoc(proyectDocRef)
  }
}