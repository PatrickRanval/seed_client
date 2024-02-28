import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrayViewComponent } from './tray-view/tray-view.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrayViewComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'seed_client';
}
