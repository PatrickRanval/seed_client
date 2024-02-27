import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietySelectorComponent } from './variety-selector.component';

describe('VarietySelectorComponent', () => {
  let component: VarietySelectorComponent;
  let fixture: ComponentFixture<VarietySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarietySelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarietySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
