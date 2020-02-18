import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCastPage } from './view-cast.page';

describe('ViewCastPage', () => {
  let component: ViewCastPage;
  let fixture: ComponentFixture<ViewCastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
