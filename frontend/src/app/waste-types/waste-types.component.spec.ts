import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteTypesComponent } from './waste-types.component';

describe('WasteTypesComponent', () => {
  let component: WasteTypesComponent;
  let fixture: ComponentFixture<WasteTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
