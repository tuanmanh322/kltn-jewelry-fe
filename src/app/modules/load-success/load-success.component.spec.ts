import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSuccessComponent } from './load-success.component';

describe('LoadSuccessComponent', () => {
  let component: LoadSuccessComponent;
  let fixture: ComponentFixture<LoadSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
