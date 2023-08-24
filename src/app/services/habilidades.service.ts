import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Habilidades } from '../models/habilidades';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  private habilidadesRef = collection(this.firestore, 'habilidades')

  constructor(private firestore: Firestore) { }

  public getHabilidades():Observable<Habilidades[]>{
    return collectionData(this.habilidadesRef, {idField: 'id'}) as Observable<Habilidades[]>
  }

  public addHabilidades(habilidades:any): Promise<void>{
    const habilidadesDocRef = doc(this.firestore, 'habilidades', habilidades.id)
    return updateDoc(habilidadesDocRef, habilidades)
  }

  public updateHabilidades(habilidades:Habilidades): Promise<void>{
    console.log(habilidades);
    
    const habilidadesDocRef = doc(this.firestore, 'habilidades', habilidades.id)
    return updateDoc(habilidadesDocRef, {...habilidades})
  }

  public deleteHabilidades(id: string): Promise<void>{
    const habilidadesDocRef = doc(this.firestore, 'habilidades', id)
    return deleteDoc(habilidadesDocRef)
  }
}