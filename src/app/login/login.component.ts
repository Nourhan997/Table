import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private route: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      response => {
        if (response.status === "failed") {
          this.route.navigate([''])
          this.isLoginFailed = true;
          this.isLoggedIn = false;
        }
        else if (response.status === "success") {
          this.route.navigate(["dashboard"])
          this.tokenStorage.saveToken(response.body.token);
          this.tokenStorage.saveUser(response.body.username);
          this.isLoggedIn = true;
        }
        console.log(response)

      },

    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
