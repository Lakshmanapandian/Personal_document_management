import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedocComponent } from './managedoc.component';

describe('ManagedocComponent', () => {
  let component: ManagedocComponent;
  let fixture: ComponentFixture<ManagedocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
