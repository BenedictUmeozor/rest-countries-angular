import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySkeletonComponent } from './country-skeleton.component';

describe('CountrySkeletonComponent', () => {
  let component: CountrySkeletonComponent;
  let fixture: ComponentFixture<CountrySkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
