import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryBordersComponent } from './country-borders.component';

describe('CountryBordersComponent', () => {
  let component: CountryBordersComponent;
  let fixture: ComponentFixture<CountryBordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryBordersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryBordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
