import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private educacionRef = collection(this.firestore, 'educacion')

  constructor(private firestore: Firestore) { }

  public getEducacion():Observable<Educacion[]>{
    return collectionData(this.educacionRef, {idField: 'id'}) as Observable<Educacion[]>
  }

  public addEducacion(educacion:Educacion): Promise<Object>{
    return addDoc(this.educacionRef, educacion)
  }

  public updateEducacion(educacion:Educacion): Promise<void>{
    const educacionDocRef = doc(this.firestore, 'educacion', educacion.id)
    return updateDoc(educacionDocRef, {...educacion})
  }

  public deleteEducacion(id: string): Promise<void>{
    const educacionDocRef = doc(this.firestore, 'educacion', id)
    return deleteDoc(educacionDocRef)
  }
}

