describe('Coinage homepage', ()=> {
  scenarios =
  [{input: '4', output: ["two sterlin 0",
                        "one sterlin 0",
                        "fifty pences 0",
                        "twenty pences 0",
                        "two pences 2"], description: 'single digit'},
  {input: '85', output: ["two sterlin 0",
                        "one sterlin 0",
                        "fifty pences 1",
                        "twenty pences 1",
                        "two pences 7",
                        "one pence 1"], description: 'double digit'},
  {input: '197p', output: ["two sterlin 0",
                          "one sterlin 1",
                          "fifty pences 1",
                          "twenty pences 2",
                          "two pences 3",
                          "one pence 1"], description: 'pence symbol'},
  {input: '2p', output: ["two sterlin 0",
                          "one sterlin 0",
                          "fifty pences 0",
                          "twenty pences 0",
                          "two pences 1"], description: 'pence symbol single digit'},
  {input: '1.87', output:["two sterlin 0",
                          "one sterlin 1",
                          "fifty pences 1",
                          "twenty pences 1",
                          "two pences 8",
                          "one pence 1"], description: 'pounds decimal'},
  {input: '£1.23', output: ["two sterlin 0",
                            "one sterlin 1",
                            "fifty pences 0",
                            "twenty pences 1",
                            "two pences 1",
                            "one pence 1"], description: 'pound symbol'},
  {input: '£2', output: ["two sterlin 1"], description: 'single digit pound symbol'},
  {input: '£10', output: ["two sterlin 5"], description: 'double digit pound symbol'},
  {input: '£1.87p', output: ["two sterlin 0",
                            "one sterlin 1",
                            "fifty pences 1",
                            "twenty pences 1",
                            "two pences 8",
                            "one pence 1"], description: 'pound and pence symbol'},
  {input: '£1p', output: ["two sterlin 0",
                          "one sterlin 1"], description: 'missing pence'},
  {input: '£1.p', output: ["two sterlin 0",
                          "one sterlin 1"], description: 'missing pence but present decimal point'},
  {input: '001.41p', output: ["two sterlin 0",
                              "one sterlin 1",
                              "fifty pences 0",
                              "twenty pences 2",
                              "two pences 0",
                              "one pence 1"], description: 'buffered zeros'},
  {input: '4.235p', output: ["two sterlin 2",
                            "one sterlin 0",
                            "fifty pences 0",
                            "twenty pences 1",
                            "two pences 2"], description: 'rounding three decimal places to two'},
  {input: '£1.257422457p', output: ["two sterlin 0",
                                    "one sterlin 1",
                                    "fifty pences 0",
                                    "twenty pences 1",
                                    "two pences 3"], description: 'rounding with symbols'}
  ];  
  
  beforeAll(()=>{
    browser.get('http://127.0.0.1:8080/');
    amountInput = element(by.model('amount'));
    convertButton = element(by.id('convertButton'));
  });

  afterEach(()=>{
    amountInput.clear();
  });

  for(let i = 0; i < scenarios.length; i++){
    it(`should correctly distribute the amount when given ${scenarios[i].description}`, ()=>{    
      amountInput.sendKeys(scenarios[i].input);    
      convertButton.click();
      
      element.all(by.repeater('i in distributedAmount'))
      .then((currencies) => {
        currencieTexts = currencies.map((currency) => currency.getText().then((text) => text));
        Promise.all(currencieTexts)
        .then((currencieTexts) => {
          expect(scenarios[i].output).toEqual(currencieTexts);
        });        
      });            
    });
  }
});