import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraySelectorComponent } from './tray-selector.component';

describe('TraySelectorComponent', () => {
  let component: TraySelectorComponent;
  let fixture: ComponentFixture<TraySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraySelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
