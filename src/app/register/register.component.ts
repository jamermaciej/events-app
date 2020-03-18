import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.auth.registerUser(this.registerUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special']);
      },
      err => console.log(err)
    );
  }
}
