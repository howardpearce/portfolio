import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsDisplayComponent } from './years-display.component';

describe('YearsDisplayComponent', () => {
  let component: YearsDisplayComponent;
  let fixture: ComponentFixture<YearsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
