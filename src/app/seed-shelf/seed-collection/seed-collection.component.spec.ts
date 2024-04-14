import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedCollectionComponent } from './seed-collection.component';

describe('SeedCollectionComponent', () => {
  let component: SeedCollectionComponent;
  let fixture: ComponentFixture<SeedCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedCollectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeedCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
