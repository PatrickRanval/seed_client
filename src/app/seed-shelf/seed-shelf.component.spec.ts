import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedShelfComponent } from './seed-shelf.component';

describe('SeedShelfComponent', () => {
  let component: SeedShelfComponent;
  let fixture: ComponentFixture<SeedShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedShelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeedShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
