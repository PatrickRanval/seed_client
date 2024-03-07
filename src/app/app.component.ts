import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TrayViewComponent } from './tray-view/tray-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TrayViewComponent, NavbarComponent, LoginComponent, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'seed_client';
}

//Not sure if Login Component needs to be here. Added RouterModule