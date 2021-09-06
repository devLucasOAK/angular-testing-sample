import { TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CoursesService } from "./courses.service"

describe('courseService', ()=> {
    
    
    let courseService: CoursesService,
    http: HttpTestingController
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoursesService
            ]
        });

        courseService = TestBed.inject(CoursesService);
        http = TestBed.inject(HttpTestingController);
    })
    
    
    it('should retrieve all courses', ()=>{
        
    })
})