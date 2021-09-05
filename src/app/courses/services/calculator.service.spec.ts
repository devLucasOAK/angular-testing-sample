import { CalculatorService } from "./calculator.service";

describe('CalculatorService', ()=> {

    let calculator: CalculatorService,
    loggerSpy: any

    beforeEach(()=>{
        
        console.log("BeforeEach")

        //Spy
        loggerSpy = jasmine.createSpyObj('logger', ['log']);
        calculator = new CalculatorService(loggerSpy);
    })    
    
    it('should add two numbers', ()=>{

        console.log("Add Test")

        const result = calculator.add(2, 2);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
        expect(result).toBe(4);

    })

    it('should substract two numbers', ()=>{

        console.log("Sub Test")


        const result = calculator.subtract(2, 2);

        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    })
});