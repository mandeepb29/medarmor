import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenomeDataComponent } from './genome-data.component';

describe('GenomeDataComponent', () => {
  let component: GenomeDataComponent;
  let fixture: ComponentFixture<GenomeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenomeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenomeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
