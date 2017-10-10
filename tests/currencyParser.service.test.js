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
    });