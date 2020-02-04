import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectManaPage } from './project-mana.page';

describe('ProjectManaPage', () => {
  let component: ProjectManaPage;
  let fixture: ComponentFixture<ProjectManaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectManaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
