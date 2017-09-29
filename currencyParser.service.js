angular.module("App").service('currencyParser', function() {    
    this.getNotationState = amount => { 
        return {
                    'hasStarlin' : amount.indexOf('£') != -1,
                    'hasDot' : amount.indexOf('.') != -1,
                    'hasPenceSymbol' : amount.indexOf('p') != -1,
                    'dotIndex' : amount.indexOf('.'),
                    'length' : amount.length
               };
    }
    this.getHundreds = amount => {
        let notationState = this.getNotationState(amount);
        let startOfSlice = this.getHundredsSliceStart(notationState); 
        let endOfSlice = this.getHundredsSliceEnd(notationState);
        let slice = amount.slice(startOfSlice, endOfSlice);
        return slice ? parseInt(slice) * 100 : 0;
    }
    this.getPences = amount => {
        let notationState = this.getNotationState(amount);      
        let startOfSlice = this.getPencesSliceStart(notationState);
        let endOfSlice = this.getPencesSliceEnd(notationState);
        let slice = amount.slice(startOfSlice, endOfSlice);
        return slice ? parseInt(slice) : 0;
    }
    this.getHundredsSliceStart = (notationState) =>{        
        if (notationState.hasStarlin) {
            return 1;
        } else {
            return (notationState.hasPenceSymbol && !notationState.hasDot)? -1 : 0;
        }                
    }
    this.getHundredsSliceEnd = (notationState) => {
        let dotIndex = notationState.dotIndex        
        if (notationState.hasDot) {
            return dotIndex;
        } else if ( notationState.hasPenceSymbol) {
            return notationState.hasStarlin? notationState.length - 1 : -1;
        } else {
            return notationState.length;
        }
    }
    this.getPencesSliceStart = (notationState) => {        
        if (notationState.hasStarlin && !notationState.hasDot) {
            return -1;
        } else if (notationState.hasDot && notationState.hasPenceSymbol) {
            return notationState.dotIndex == notationState.length - 2? -1: notationState.dotIndex + 1;
        } else if (notationState.hasDot && !notationState.hasPenceSymbol) {
            return notationState.dotIndex == notationState.length - 1? -1 : notationState.dotIndex + 1;
        } else {
            return 0;
        }
    }
    this.getPencesSliceEnd = (notationState) => {
        if (notationState.hasStarlin && !notationState.hasDot) {
            return -1;
        } else if (notationState.hasDot && notationState.hasPenceSymbol) {
            return notationState.dotIndex == notationState.length - 2? -1 : notationState.length -1;                
        } else if (notationState.hasDot && !notationState.hasPenceSymbol) {
            return notationState.dotIndex == notationState.length - 1? -1 : notationState.length;
        } else {
            return notationState.hasPenceSymbol? notationState.length -1 : notationState.length;
        }
    }
    
});