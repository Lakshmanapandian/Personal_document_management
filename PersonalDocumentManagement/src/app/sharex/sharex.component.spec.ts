import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharexComponent } from './sharex.component';

describe('SharexComponent', () => {
  let component: SharexComponent;
  let fixture: ComponentFixture<SharexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
