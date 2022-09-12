import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonErrorDisplayComponent } from './common-error-display.component';

describe('CommonErrorDisplayComponent', () => {
  let component: CommonErrorDisplayComponent;
  let fixture: ComponentFixture<CommonErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonErrorDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
