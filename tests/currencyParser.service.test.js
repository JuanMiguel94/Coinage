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
            it('returns the start index of hundreds in a given number with no sterlin, dot and no pence', function () {            
                expect(currencyParser.getHundredsSliceStart({'hasStarlin' : false,
                                                             'hasDot' : true,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : 3,
                                                             'length' : 7})).toEqual(0);
            });
            it('returns the start index of hundreds in a given number with sterlin, dot and no pence', function () {            
                expect(currencyParser.getHundredsSliceStart({'hasStarlin' : true,
                                                             'hasDot' : true,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : 4,
                                                             'length' : 8})).toEqual(1);
            });
            it('returns the start index of hundreds in a given number with no sterlin, no dot and no pence', function () {            
                expect(currencyParser.getHundredsSliceStart({'hasStarlin' : false,
                                                             'hasDot' : false,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : -1,
                                                             'length' : 6})).toEqual(0);
            });
            it('returns the start index of hundreds in a given number with sterlin, no dot and no pence', function () {            
                expect(currencyParser.getHundredsSliceStart({'hasStarlin' : true,
                                                             'hasDot' : false,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : -1,
                                                             'length' : 7})).toEqual(1);
            });
        });
        describe('getHundredsSliceEnd', function () {
            it('returns the end index of hundreds in a given number with no sterlin, dot and no pence', function () {            
                expect(currencyParser.getHundredsSliceEnd({'hasStarlin' : false,
                                                             'hasDot' : true,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : 3,
                                                             'length' : 7})).toEqual(3);
            });
            it('returns the end index of hundreds in a given number with sterlin, dot and no pence', function () {            
                expect(currencyParser.getHundredsSliceEnd({'hasStarlin' : true,
                                                             'hasDot' : false,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : -1,
                                                             'length' : 7})).toEqual(7);
            });
        });
        describe('getPencesSliceStart', function () {
            it('returns the start index of pences in a given number with no sterlin, dot and no pence', function () {            
                expect(currencyParser.getPencesSliceStart({'hasStarlin' : false,
                                                             'hasDot' : true,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : 3,
                                                             'length' : 7})).toEqual(4);
            });
            it('returns the start index of pences in a given number with sterlin, dot and no pence', function () {            
                expect(currencyParser.getPencesSliceStart({'hasStarlin' : false,
                                                             'hasDot' : false,
                                                             'hasPenceSymbol' : true,
                                                             'dotIndex' : -1,
                                                             'length' : 7})).toEqual(0);
            });
        });
        describe('getPencesSliceEnd', function () {
            it('returns the end index of penses in a given number with no sterlin, dot and no pence', function () {            
                expect(currencyParser.getPencesSliceEnd({'hasStarlin' : false,
                                                             'hasDot' : true,
                                                             'hasPenceSymbol' : false,
                                                             'dotIndex' : 3,
                                                             'length' : 7})).toEqual(7);
            });
            it('returns the end index of penses in a given number with sterlin, dot and no pence', function () {            
                expect(currencyParser.getPencesSliceEnd({'hasStarlin' : false,
                                                             'hasDot' : false,
                                                             'hasPenceSymbol' : true,
                                                             'dotIndex' : -1,
                                                             'length' : 7})).toEqual(6);
            });
        });

    });