import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTraysComponent } from './user-trays.component';

describe('UserTraysComponent', () => {
  let component: UserTraysComponent;
  let fixture: ComponentFixture<UserTraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTraysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
