describe('currencyParser', function () {
    
        beforeEach(module('App'));
    
        var calculatorService;
    
        beforeEach(inject(function(_currencyParser_){
            currencyParser = _currencyParser_;            
        }));
    
        describe('getHundreds', function () {
            it('returns the value of the hundreds of a given number', function () {            
                expect(currencyParser.getHundreds('123.123')).toEqual(12300);
            });
        });
        describe('getPences', function () {
            it('returns the value of the pences of a given number', function () {            
                expect(currencyParser.getPences('123.123')).toEqual(123);
            });
        });
        describe('getHundredsSliceStart', function () {
            it('returns the index of the start of the hundreds in a given number with sterlin', function () {            
                expect(currencyParser.getHundredsSliceStart('123.123')).toEqual(0);
            });
            it('returns the index of the start of the hundreds in a given number without sterlin', function () {            
                expect(currencyParser.getHundredsSliceStart('£123.123')).toEqual(1);
            });
        });
        describe('getHundredsSliceEnd', function () {
            it('returns the index of the end of the hundreds in a given number without dot', function () {            
                expect(currencyParser.getHundredsSliceEnd('1234')).toEqual(4);
            });
            it('returns the index of the end of the hundreds in a given number with dot', function () {            
                expect(currencyParser.getHundredsSliceEnd('12.34')).toEqual(2);
            });
        });
        describe('getPencesSliceStart', function () {
            it('returns the index of the start of the pences in a given number with dot', function () {            
                expect(currencyParser.getPencesSliceStart('12.34')).toEqual(3);
            });
            it('returns the index of the start of the pences in a given number without dot ', function () {            
                expect(currencyParser.getPencesSliceStart('1234')).toEqual(0);
            });
        });
        describe('getPencesSliceEnd', function () {
            it('returns the index of the end of the pences in a given number without p symbol', function () {            
                expect(currencyParser.getPencesSliceEnd('12.34')).toEqual(5);
            });
            it('returns the index of the end of the pences in a given number with p symbol', function () {            
                expect(currencyParser.getPencesSliceEnd('12.34p')).toEqual(5);
            });
        });

    });