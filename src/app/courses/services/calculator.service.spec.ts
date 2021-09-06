import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any

    beforeEach(() => {

        console.log("BeforeEach")
        //Spy
        loggerSpy = jasmine.createSpyObj('logger', ['log']);

        TestBed.configureTestingModule({
            providers: [CalculatorService, { provide: LoggerService, useValue: loggerSpy }]
        })

        calculator = TestBed.inject(CalculatorService)
    })

    it('should add two numbers', () => {

        console.log("Add Test")

        const result = calculator.add(2, 2);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
        expect(result).toBe(4);

    })

    it('should substract two numbers', () => {

        console.log("Sub Test")


        const result = calculator.subtract(2, 2);

        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    })
});