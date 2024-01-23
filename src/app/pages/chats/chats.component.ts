import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AppService } from '../../services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [AppService],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsComponent {
  constructor(private route: Router, private service: AppService) {}
  contacts: any = [];
  ngOnInit(): void {
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getContact();
      });
    this.getContact();
  }

  getContact(): void {
    this.service.getContacts().subscribe({
      next: (response) => {
        console.log(response);
        
        this.contacts = response;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }

  hideArrowIcon: boolean = true;
  changeRoute(chat: HTMLElement, span: any, id: string): void {
    span.classList.add('hidden');
    if (window.screen.width <= 767) chat.classList.add('hidden');
    else chat.classList.remove('hidden');

    this.route.navigate([`message/${id}`]);
  }

  showIcon(icon: HTMLElement): void {
    icon.classList.remove('hidden');
  }

  hideIcon(icon: HTMLElement): void {
    icon.classList.add('hidden');
  }
}
