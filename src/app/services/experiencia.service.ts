import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private experienciaRef = collection(this.firestore, 'experiencia')

  constructor(private firestore: Firestore) { }

  public getExperiencia():Observable<Experiencia[]>{
    return collectionData(this.experienciaRef, {idField: 'id'}) as Observable<Experiencia[]>
  }

  public addExperiencia(experiencia:Experiencia): Promise<Object>{
    return addDoc(this.experienciaRef, experiencia)
  }

  public updateExperiencia(experiencia:Experiencia): Promise<void>{
    const experienciaDocRef = doc(this.firestore, 'experiencia', experiencia.id)
    return updateDoc(experienciaDocRef, {...experiencia})
  }

  public deleteExperiencia(id: string): Promise<void>{
    const experienciaDocRef = doc(this.firestore, 'experiencia', id)
    return deleteDoc(experienciaDocRef)
  }
}
