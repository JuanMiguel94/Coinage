angular.module("App").service('currencyParser', function() {
    this.getHundreds = amount => {
        let startOfSlice = this.getHundredsSliceStart(amount); 
        let endOfSlice = this.getHundredsSliceEnd(amount);
        let slice = amount.slice(startOfSlice, endOfSlice);
        return slice ? parseInt(slice) * 100 : 0;
    }
    this.getPences = amount => {        
        let startOfSlice = this.getPencesSliceStart(amount);
        let endOfSlice = this.getPencesSliceEnd(amount);
        let slice = amount.slice(startOfSlice, endOfSlice);
        return slice ? parseInt(slice) : 0;
    }
    this.getHundredsSliceStart = amount =>{
        let sterlinIndex = amount.indexOf('£');
        return sterlinIndex != -1 ? sterlinIndex + 1 : 0;
    }
    this.getHundredsSliceEnd = amount => {
        let dotIndex = amount.indexOf('.');
        return dotIndex != -1 ? dotIndex : amount.length;
    }
    this.getPencesSliceStart = (amount) => {
        let dotIndex = amount.indexOf('.');
        return dotIndex != -1 ? dotIndex + 1 : 0;
    }
    this.getPencesSliceEnd = (amount) => {
        let penceSymbolIndex = amount.indexOf('p');
        return penceSymbolIndex != -1 ? amount.length - 1 : amount.length;
    }
});