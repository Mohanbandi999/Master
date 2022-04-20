import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeaverequestComponent } from './approve-leaverequest.component';

describe('ApproveLeaverequestComponent', () => {
  let component: ApproveLeaverequestComponent;
  let fixture: ComponentFixture<ApproveLeaverequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveLeaverequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
