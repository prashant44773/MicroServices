import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashComponent } from './fash.component';

describe('FashComponent', () => {
  let component: FashComponent;
  let fixture: ComponentFixture<FashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
