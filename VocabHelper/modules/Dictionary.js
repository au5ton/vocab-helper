/*
*  Dictionary.js
*
*  Loads the dictionary into memory
*
*/

var _dictionaryLoadedEvent = new Event('VHDictionaryFinishedLoading');
var _dictionary = {};

jQuery.get(chrome.extension.getURL('../lib/dictionary.json'), function(data){
    _dictionary = JSON.parse(data);
    document.dispatchEvent(_dictionaryLoadedEvent);
});
