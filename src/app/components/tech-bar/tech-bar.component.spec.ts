import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechBarComponent } from './tech-bar.component';

describe('TechBarComponent', () => {
  let component: TechBarComponent;
  let fixture: ComponentFixture<TechBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
