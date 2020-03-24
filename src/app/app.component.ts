import { AuthService } from './services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  userId: string;
  userEmail: string;
  userIdSubscription: Subscription;

  constructor(private auth: AuthService) {
    this.auth.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnInit() {
    this.userIdSubscription = this.auth.user.subscribe(user => {
      this.userId = user?._id;
      this.userEmail = user?.email;
    });
  }

  logout() {
    this.auth.logoutUser();
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }
}
