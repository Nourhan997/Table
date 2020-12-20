import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp';
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.isUserLoggedIn()) {
      this.isLoggedIn = true
    }
    console.log(this.isLoggedIn)
  }



  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}