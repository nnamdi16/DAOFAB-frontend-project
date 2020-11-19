import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTransactionComponent } from './child-transaction.component';

describe('ChildTransactionComponent', () => {
  let component: ChildTransactionComponent;
  let fixture: ComponentFixture<ChildTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
