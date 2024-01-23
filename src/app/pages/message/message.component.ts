import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [HttpClientModule],
  providers: [AppService],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  constructor(
    private service: AppService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  contact: any;
  id!: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => (this.id = response['id']),
    });

    this.getContacts();

    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getContacts();
      });
  }
  
  getContacts(): void {
    this.service.getContacts().subscribe({
      next: (response) => {
        const profile = response.find((_: any) => _.id == this.id);
        this.contact = profile
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}
