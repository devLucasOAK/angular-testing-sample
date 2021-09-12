import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {

    let calculator: CalculatorService,
        loggerSpy: any

    beforeEach(() => {

        //
        //Spy
        loggerSpy = jasmine.createSpyObj('logger', ['log']);

        TestBed.configureTestingModule({
            providers: [CalculatorService, { provide: LoggerService, useValue: loggerSpy }]
        })

        calculator = TestBed.inject(CalculatorService)
    })

    it('should add two numbers', () => {

        //

        const result = calculator.add(2, 2);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
        expect(result).toBe(4);

    })

    it('should substract two numbers', () => {

        //


        const result = calculator.subtract(2, 2);

        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);

    })
});