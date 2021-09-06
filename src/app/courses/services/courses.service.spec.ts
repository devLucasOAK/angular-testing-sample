import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CoursesService } from "./courses.service"
import { COURSES, findLessonsForCourse, LESSONS } from "../../../../server/db-data"
import { Course } from "../model/course"
import { HttpErrorResponse } from "@angular/common/http"

describe('courseService', ()=> {
    
    
    let service: CoursesService,
    http: HttpTestingController
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService
            ]
        });

        service = TestBed.inject(CoursesService);
        http = TestBed.inject(HttpTestingController);
    })
    
    
    it('should retrieve all courses', ()=>{
        service.findAllCourses().subscribe(res => {
            expect(res).toBeTruthy('No Courses Found')
            expect(res.length).toBe(12, "Incorrect Number")
            
            const course = res.find(course => course.id == 12)
            expect(course.titles.description).toBe('Angular Testing Course')
        })

        const req = http.expectOne('/api/courses')
        expect(req.request.method).toEqual("GET")

        req.flush({payload: Object.values(COURSES)})
    })

    it('should find a course by id', ()=>{
        service.findCourseById(12).subscribe(res => {
            expect(res).toBeTruthy()
            expect(res.id).toBe(12)
        })

        const req = http.expectOne('/api/courses/12')
        console.log(req.request.url)
        //expect(req.request.method).toEqual('GET')
        
        req.flush(COURSES[12])
    })

    it('should save course', () => {

        let changes: Partial<Course>  = {titles:{description: 'Testing Mock'}}

        service.saveCourse(12, changes )
        .subscribe(res => {
            expect(res.id).toBe(12)
        })

        const req = http.expectOne('/api/courses/12')
        expect(req.request.method).toEqual('PUT')
        expect(req.request.body.titles.description)
        .toEqual(changes.titles.description)

        req.flush({
            ...COURSES[12],
            ...changes
        })
    })

    it('should throw error if save fails', () => {

        let changes: Partial<Course>  = {titles:{description: 'Testing Mock'}}

        service.saveCourse(12, changes )
        .subscribe(() => 
            fail("The save course operation should have failed"),
            (error:HttpErrorResponse) => {
                expect(error.status).toBe(500);
            } 
        )

        const req = http.expectOne('/api/courses/12')
        expect(req.request.method).toEqual('PUT')

        req.flush('Save course failed', {status:500, statusText: "Internal Server Error"})
    })

    it('it should find a list of lessons', () => {

        let params = 

        service.findLessons(12)
        .subscribe(res => {
            expect(res).toBeTruthy()
            expect(res.length).toBe(3)
        })

        const req = http.expectOne(
            req => req.url == '/api/lessons')

        expect(req.request.method).toEqual('GET')
        expect(req.request.params.get("courseId")).toEqual("12")
        expect(req.request.params.get("filter")).toEqual("")
        expect(req.request.params.get("sortOrder")).toEqual("asc")
        expect(req.request.params.get("pageNumber")).toEqual("0")
        expect(req.request.params.get("pageSize")).toEqual("3")

        req.flush({
            payload: findLessonsForCourse(12).slice(0,3)
        })
    })

    afterEach(() => {
        http.verify()
    })
})