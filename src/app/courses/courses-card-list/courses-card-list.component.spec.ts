import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent
  let fixture: ComponentFixture<CoursesCardListComponent>
  let el: DebugElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement
    })
  }))


  it("should create the component", () => {

   expect(component).toBeTruthy()

  });


  it("should display the course list", () => {

    component.courses = setupCourses();
    fixture.detectChanges() //Call everytime we input data in component

    const cards = el.queryAll(By.css(".course-card"));
    expect(cards).toBeTruthy("Could Not find cards")
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });


  it("should display the first course", () => {

    component.courses = setupCourses();
    fixture.detectChanges() //Call everytime we input data in component
    //Debug element
    // console.log(el.nativeElement.outerHTML)

    const course = component.courses[0]

    const card = el.query(By.css(".course-card:first-child")),
    title = card.query(By.css("mat-card-title")),
    image = card.query(By.css("img"));

    console.log(title.nativeElement.outerHTML)
    console.log(image.nativeElement.outerHTML)

    expect(card).toBeTruthy("Could Not find card")
    expect(title.nativeElement.textcontent).toBe(course.titles.description, "Description Not Found")
    expect(image.nativeElement.src).toBe(course.iconUrl, "IconUrl Not Found")
  });


});


