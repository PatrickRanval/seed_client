import { Component } from '@angular/core';
import { TrayComponent } from './tray/tray.component';
import { VarietySelectorComponent } from './variety-selector/variety-selector.component';
import { TraySelectorComponent } from './tray-selector/tray-selector.component';
import { UserTraysComponent } from './user-trays/user-trays.component';

@Component({
  selector: 'app-tray-view',
  standalone: true,
  imports: [TrayComponent, VarietySelectorComponent, TraySelectorComponent, UserTraysComponent],
  templateUrl: './tray-view.component.html',
  styleUrl: './tray-view.component.scss'
})
export class TrayViewComponent {



}
