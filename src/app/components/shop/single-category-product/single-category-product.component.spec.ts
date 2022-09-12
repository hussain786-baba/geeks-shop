import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategoryProductComponent } from './single-category-product.component';

describe('SingleCategoryProductComponent', () => {
  let component: SingleCategoryProductComponent;
  let fixture: ComponentFixture<SingleCategoryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCategoryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCategoryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
