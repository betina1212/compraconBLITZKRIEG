import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/user/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: Usuario;

  constructor(
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {

    if ( this.authService.getCurrentUser() !== null ) {
      this.userService.getUser(this.authService.getCurrentUser().id).subscribe( data => {
        this.user = data;
      }, err => console.log(err));
    }
  }

  public onLogout() {
    this.authService.logoutUser();
  }

}
