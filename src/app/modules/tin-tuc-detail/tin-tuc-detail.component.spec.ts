import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTucDetailComponent } from './tin-tuc-detail.component';

describe('TinTucDetailComponent', () => {
  let component: TinTucDetailComponent;
  let fixture: ComponentFixture<TinTucDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinTucDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinTucDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
