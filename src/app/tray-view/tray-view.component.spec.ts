import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayViewComponent } from './tray-view.component';

describe('TrayViewComponent', () => {
  let component: TrayViewComponent;
  let fixture: ComponentFixture<TrayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrayViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
