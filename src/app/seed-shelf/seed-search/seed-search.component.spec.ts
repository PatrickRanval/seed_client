import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedSearchComponent } from './seed-search.component';

describe('SeedSearchComponent', () => {
  let component: SeedSearchComponent;
  let fixture: ComponentFixture<SeedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
