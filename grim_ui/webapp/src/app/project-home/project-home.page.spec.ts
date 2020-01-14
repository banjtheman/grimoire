import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectHomePage } from './project-home.page';

describe('ProjectHomePage', () => {
  let component: ProjectHomePage;
  let fixture: ComponentFixture<ProjectHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
