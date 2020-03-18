import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special']);
      },
      err => console.log(err)
    );
  }
}
