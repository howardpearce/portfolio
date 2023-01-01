import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionNumberComponent } from './version-number.component';

describe('VersionNumberComponent', () => {
  let component: VersionNumberComponent;
  let fixture: ComponentFixture<VersionNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
