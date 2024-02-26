import { Component } from '@angular/core';
import { TrayComponent } from './tray/tray.component';

@Component({
  selector: 'app-tray-view',
  standalone: true,
  imports: [TrayComponent],
  templateUrl: './tray-view.component.html',
  styleUrl: './tray-view.component.scss'
})
export class TrayViewComponent {

}
