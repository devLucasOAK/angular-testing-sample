import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { setupCourses } from '../common/setup-test-data';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any

  const beginnerCourses = setupCourses()
  .filter(course => course.category === 'BEGINNER')

  const advancedCourses = setupCourses()
  .filter(course => course.category === 'ADVANCED')



  beforeEach(waitForAsync(() => {

    const courseServiceSpy = jasmine.createSpyObj(
      'coursesService', 
      ['findAllCourses']
      )

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [{provide: CoursesService, useValue: courseServiceSpy}]

    }).compileComponents().then(()=>{
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement
      coursesService = TestBed.inject(CoursesService);
    })


  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    coursesService.findAllCourses.and.returnValue(of(beginnerCourses))
    
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"))

    expect(tabs.length).toBe(1, "Unexpected Tabs")

  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses))
    
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"))

    expect(tabs.length).toBe(1, "Unexpected Tabs")

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()))
    
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"))

    expect(tabs.length).toBe(2, "Expected 2 tabs")

  });


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    tabs[1].nativeElement.click()

    fixture.detectChanges();

    flush();

    const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

    console.log(cardTitles);

    expect(cardTitles.length).toBeGreaterThan(0,"Could not find card titles");

    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

}));

  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()))

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"))

    tabs[1].nativeElement.click()

    fixture.detectChanges();

    //when stable similar to timeout()
    fixture.whenStable().then(()=> {   
      const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
      console.log(cardTitles)
      expect(cardTitles.length).toBeGreaterThan(0, "couldNotEmpty")
      expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course")
    })
  }));
});


