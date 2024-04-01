import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Task0Component } from './task0.component';

describe('Task0Component', () => {
  let component: Task0Component;
  let fixture: ComponentFixture<Task0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Task0Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Task0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
