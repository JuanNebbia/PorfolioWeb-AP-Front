import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/messages.service';
import { AuthenticationService } from '../services/authentication.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages:Message[]=[];
  public loading:boolean = true;

  constructor(private messageService:MessageService, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.getMessages()
  }

  public getMessages():void{
    this.messageService.getMessage().subscribe({
      next:(Response: Message[]) =>{
        const orderedResponse = Response.sort((a:Message, b:Message) => {
          return +b.date - +a.date;
        });        
        const finalResponse = orderedResponse.map( item => {
          item.date = `${item.date.toDate().getDate()}/${item.date.toDate().getMonth() + 1}/${item.date.toDate().getFullYear()}`
          return item
        })
        this.messages = finalResponse
        this.loading=false
      },
      error:(error)=>{
        console.log(error);
      },
      complete:()=>this.loading=false
    })
  }

  public onDeleteMessage(id:string):void{
    if(window.confirm('¿Seguro?')){
      this.messageService.deleteMessage(id)
    } 
  }
}
