import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'


describe('Async Examples', () => {

    it('Jasmine Done', (done:DoneFn) => {
    
        //Using for browser events
        //Not the best approach cause we are hardcolding the time
        
        let test = false
        
        setTimeout(()=> {
            
            test = true
            expect(test).toBeTruthy()
            done()
        },1000)

    })

    it('Fake Async', fakeAsync(() => {

        let test = false
        
        setTimeout(()=> {
            
            test = true
            expect(test).toBeTruthy()
        },1000)

        //execute all pending TimeOuts, no need to pass amount of time 
        flush()

        //control evolution of time inside async test
        tick(1000)
        //we can expect the results outside of the block
        expect(test).toBeTruthy()


    }))

    it('Resolve Promises', fakeAsync(() => {

        //TODO

        let test = false

        //Promise has priorities over Timeouts
        
        Promise.resolve()
        .then(()=>{
            
            return Promise.resolve().then(() => {
                
                test = true
            })
        })

        //Flush Promises before assertions
        flushMicrotasks()
        
        expect(test).toBeTruthy()

    }))

    it('Promises + Timeout', fakeAsync(() => {

        let counter = 0

        Promise.resolve().then(() => {

            counter += 10;

            setTimeout(() => {

                counter += 10;

            },1000)
        })

        expect(counter).toBe(0)
        flushMicrotasks()
        expect(counter).toBe(10)
        flush()
        expect(counter).toBe(20)
    }))

    it('Observables', fakeAsync(() => {

        let test = false
        
        const test$ = of(test).pipe(delay(1000))

        test$.subscribe(() => {
            test = true
        })

        tick(1000)
        expect(test).toBe(true)
    }))
}) 