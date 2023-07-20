import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/messages.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  messageForm = this.formBuilder.group({
    message: '',
    sender: ''
  })

  constructor(private messageService:MessageService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  onSendMessage():void {
    this.messageForm.value.date = new Date()
    console.log(this.messageForm.value);
    
    this.messageService.addMessage(this.messageForm.value)
    this.messageForm.reset()
  }

}