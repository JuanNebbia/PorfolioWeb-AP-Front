import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Informacion } from '../models/informacion';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  private informacionRef = doc(this.firestore, 'informacion', 'gUYdTtp3JhWf2EvpcR9U')

  constructor(private firestore: Firestore) { }

  public getInformacion(): Observable<Informacion>{
    const docSnap = getDoc(this.informacionRef)
    return docData(this.informacionRef) as Observable<Informacion>
  }

  public updateInformacion(informacion: Informacion): Promise<void>{
    const infoDocRef = doc(this.firestore, 'informacion', 'gUYdTtp3JhWf2EvpcR9U')
    return updateDoc(this.informacionRef, {...informacion})
  }
}
