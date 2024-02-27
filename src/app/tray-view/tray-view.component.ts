import { Component } from '@angular/core';
import { TrayComponent } from './tray/tray.component';
import { VarietySelectorComponent } from './variety-selector/variety-selector.component';

@Component({
  selector: 'app-tray-view',
  standalone: true,
  imports: [TrayComponent, VarietySelectorComponent],
  templateUrl: './tray-view.component.html',
  styleUrl: './tray-view.component.scss'
})
export class TrayViewComponent {

}
