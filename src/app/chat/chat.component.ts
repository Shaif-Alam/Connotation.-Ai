import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = '';
  chatHistory: { sender: string; message: string }[] = [];
  loading: boolean = false;
  error: string = '';
showEnergyCore = true;
  constructor(private http: HttpClient) {}

sendMessage() {
  const message = this.userInput.trim();
  if (!message) return;

  // 👇 Hide energy core after first interaction
  this.showEnergyCore = false;

  this.chatHistory.push({ sender: 'You', message });
  this.userInput = '';
  this.loading = true;
  this.error = '';

  this.http.post<any>('http://localhost:3000/api/chat', { message })
    .subscribe({
      next: (res) => {
        this.chatHistory.push({ sender: 'AI', message: res.reply });
        this.loading = false;
      },
      error: (err) => {
        this.chatHistory.push({ sender: 'AI', message: 'Something went wrong. Try again later.' });
        this.error = err.message || 'Unknown error';
        this.loading = false;
      }
    });
}

}