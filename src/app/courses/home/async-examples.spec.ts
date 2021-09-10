import { fakeAsync, flush, tick } from '@angular/core/testing'


fdescribe('Async Examples', () => {

    it('Jasmine Done', (done:DoneFn) => {
    
        //Using for browser events
        //Not the best approach cause we are hardcolding the time
        
        let test = false
        
        setTimeout(()=> {
            console.log("run assertions")
            test = true
            expect(test).toBeTruthy()
        },1000)

        done()
    })

    it('Fake Async', fakeAsync(() => {

        let test = false
        
        setTimeout(()=> {
            console.log("run assertions")
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

    it('Resolve Promises', () => {

        //TODO

        let test = false

        
        console.log("First TimeOut")
        setTimeout(()=> {
            console.log("TimeOut")
        })

        console.log("Second TimeOut")
        setTimeout(()=> {
            console.log("TimeOut")
        })
        
        //Promise has priorities over Timeouts
        console.log("Promise")
        Promise.resolve()
        .then(()=>{
            console.log("First then Block")
            return Promise.resolve().then(() => {
                console.log("Second then Block")
                test = true
            })
        })
        console.log("Expect assertions")
        expect(test).toBeTruthy()

    })
}) 