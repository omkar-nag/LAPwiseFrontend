import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { SubTopicsComponent } from './sub-topics.component';

describe('SubTopicsComponent', () => {
  let component: SubTopicsComponent;
  let fixture: ComponentFixture<SubTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterTestingModule,HttpClientTestingModule,  JwtModule.forRoot({})],
      declarations: [ SubTopicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
