import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTucJewelryComponent } from './tin-tuc-jewelry.component';

describe('TinTucJewelryComponent', () => {
  let component: TinTucJewelryComponent;
  let fixture: ComponentFixture<TinTucJewelryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinTucJewelryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinTucJewelryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
