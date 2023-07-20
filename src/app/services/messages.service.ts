import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageRef = collection(this.firestore, 'messages')

  constructor(private firestore: Firestore) { }

  public getMessage():Observable<Message[]>{
    return collectionData(this.messageRef, {idField: 'id'}) as Observable<Message[]>
  }

  public addMessage(message:Message): Promise<Object>{
    return addDoc(this.messageRef, message)
  }

  public updateMessage(message:Message): Promise<void>{
    const messageDocRef = doc(this.firestore, 'messages', message.id)
    return updateDoc(messageDocRef, {...message})
  }

  public deleteMessage(id: string): Promise<void>{
    const messageDocRef = doc(this.firestore, 'messages', id)
    return deleteDoc(messageDocRef)
  }
}