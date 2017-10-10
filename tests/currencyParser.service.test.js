describe('currencyParser', function () {
    
        beforeEach(module('App'));
    
        var calculatorService;
        var parseAmountIntoPencesInputs = [{input: '4', output: 4, description: 'single digit'},
        {input: '85', output: 85, description: 'double digit'},
        {input: '197p', output: 197, description: 'pence symbol'},
        {input: '2p', output: 2, description: 'pence symbol single digit'},
        {input: '1.87', output:187, description: 'pounds decimal'},
        {input: '£1.23', output: 123, description: 'pound symbol'},
        {input: '£2', output: 200, description: 'single digit pound symbol'},
        {input: '£10', output: 1000, description: 'double digit pound symbol'},
        {input: '£1.87p', output: 187, description: 'pound and pence symbol'},
        {input: '£1p', output: 100, description: 'missing pence'},
        {input: '£1.p', output: 100, description: 'missing pence but present decimal point'},
        {input: '001.41p', output: 141, description: 'buffered zeros'},
        {input: '4.235p', output: 424, description: 'rounding three decimal places to two'},
        {input: '£1.257422457p', output: 126, description: 'rounding with symbols'}];
        
        beforeEach(inject(function(_currencyParser_){
            currencyParser = _currencyParser_;
        }));
        describe('parseAmountIntoPences', function () {
            parseAmountIntoPencesInputs.forEach(scenario => {
                it(`parses string to pence when given ${scenario.description}`, () => {            
                    expect(currencyParser.parseAmountIntoPences(scenario.input, 2)).toEqual(scenario.output);
                });
            });                        
        });
        describe('getUpdatedMagnitude', function () {            
            it('returns 100 if first element of amountInput is £', () => {            
                expect(currencyParser.getUpdatedMagnitude('£123', 10)).toEqual(100);
            });
            it('returns 1 if first element of amountInput is .', () => {            
                expect(currencyParser.getUpdatedMagnitude('.123', 10)).toEqual(1);
            });
            it('returns currentMagnitude if first element of amountInput is not . or £', () => {
                currentMagnitude = 10;
                expect(currencyParser.getUpdatedMagnitude('123', currentMagnitude)).toEqual(currentMagnitude);
            });
        });
        
        describe('getRoundIncrement', function () {
            it(`returns the value to add to a number in the current step to round it 
            when has a number above 5 at the rounding point`,() => {
                expect(currencyParser.getRoundIncrement('.346', 2)).toEqual(0.1);
            });
            it(`returns the value to add to a number in the current step to round it
            when has a number below 5 at the rounding point`,() => {
                expect(currencyParser.getRoundIncrement('.342', 2)).toEqual(0);
            });
            it(`returns the value to add to a number in the current step to round it
            when has a 5 at the rounding point`,() => {
                expect(currencyParser.getRoundIncrement('.345', 2)).toEqual(0.1);
            });     
        });
        
        describe('hasToBeRound', function () {
            it(`returns true if the first element in the current amountInput is a . and
                the digits to round to are less than the remaining digits minus 1 and
                if the number at the rounding point is greater or equal to 5`,()=>{
                    expect(currencyParser.hasToBeRound('.136', 2)).toEqual(true);
            });
            it('returns false if the first element in the current amountInput is not a .',()=>{
                expect(currencyParser.hasToBeRound('132', 2)).toEqual(false);
            });
            it(` return false if the digits to round to are greater or equal than the remaining
            digits minus 1`,()=>{
                expect(currencyParser.hasToBeRound('.13', 2)).toEqual(false);
            });
            it('returns false if the number at the rounding point is less than 5',()=>{
                expect(currencyParser.hasToBeRound('.132', 2)).toEqual(false);
            });
        });
        
        describe('getIndexes', function () {
            it(`returns the indexes where the amount string should be sliced
            when there is a £ or . at the beginning of the string`,()=>{
                expect(currencyParser.getIndexes('£1234', 2)).toEqual({head:1,end:5});
            });
            it(`returns the indexes where the amount string should be sliced
            when there is no £ or . at the beginning of the string`,()=>{
                expect(currencyParser.getIndexes('1234', 2)).toEqual({head:0,end:4});
            });
            it(`returns the indexes where the amount string should be sliced
            when there is a p at the end of the string`,()=>{
                expect(currencyParser.getIndexes('1234p', 2)).toEqual({head:0,end:4});
            });
            it(`returns the indexes where the amount string should be sliced
            when there is a . at the beginning of the string and digits to be round`,()=>{
                expect(currencyParser.getIndexes('.34567', 2)).toEqual({head:1,end:3});
            });
        });               
    });