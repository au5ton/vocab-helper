/*
*  AutoDefine.js
*
*  Automatically defines words on the subject page
*
*/


var AutoDefine = new AutoDefine();

$(document).on('VHDictionaryFinishedLoading', function(){
    console.log('Dictionary finished loading!');
    //console.log(_dictionary['SOOT']);

    AutoDefine.setup();

    //.spelltheword
    //.instructions strong
    //field left
    //<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="true" class="wordspelling">
    //field right
    //<button class="ss-write left">LOOKUP!</button>

    $(AutoDefine.lookUpButton).on('click', function(){

        var word = 'null';
        console.log(AutoDefine.getChallengeType());
        if(AutoDefine.getChallengeType() === 'spelltheword') {
            word = $('.spelltheword .field.left input').val();
            console.log('Looking up:', word);
            AutoDefine.toggleDefinitionForWord(word);
        }
        else if(AutoDefine.getChallengeType() === 'instructions') {
            word = $('.instructions strong').html();
            console.log('Looking up:', word);
            AutoDefine.toggleDefinitionForWord(word);
        }
        else {
            console.log('No supported word locations detected.');
        }

    });

    // select the target node
    var target = document.querySelector('#challengeContainer');

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log(mutation.type);
            //AutoDefine.setup();
        });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);

});



function AutoDefine() {

    this.getChallengeType = function() {
        if($('.spelltheword').length > 0) {
            return 'spelltheword';
        }
        else if($('.instructions strong') !== null || $('.instructions').length > 0) {
            return 'instructions';
        }
        else {
            return null;
        }
    };

    this.createElements = function() {
        this.lookUpButton = document.createElement('button');
        this.lookUpButton.innerHTML = 'LOOKUP WORD';

        //.messagePane
        //<div class="messages vocab-helper-message"><p style="display:none;">Hello world</p></div>
        this.lookUpBox = document.createElement('div');
        this.lookUpBox.setAttribute('class','vocab-helper-message');
        this.lookUpBoxWord = document.createElement('h4');
        this.lookUpBoxDefinition = document.createElement('p');
    };

    this.installElements = function() {
        $('.messagePane').prepend(this.lookUpBox);
        $(this.lookUpBox).append(this.lookUpBoxWord,this.lookUpBoxDefinition);

        if($('.spelltheword').length === 1) {
            $('.spelltheword .field.right').append(this.lookUpButton);
        }
        else if($('.instructions').length === 1) {
            $('.instructions').append(this.lookUpButton);
        }
        else {
            //idk yet
        }

    };

    this.fixElements = function() {

        //Enable system-level spellchecks
        if(this.getChallengeType() === 'spelltheword') {
            $('.spelltheword .field.left input').attr('autocomplete','on');
            $('.spelltheword .field.left input').attr('autocorrect','on');
            $('.spelltheword .field.left input').attr('autocapitalize','on');
            $('.spelltheword .field.left input').attr('spellcheck','true');
        }
    };

    this.setup = function() {

        this.popupOpened = false;
        this.lastWord = '';
        this.createElements();
        this.installElements();
        this.fixElements();

    };

    this.toggleDefinitionForWord = function(word) {

        if(word === '') {
            this.popupOpened = false;
            $(this.lookUpBox).hide();
            //$('.messagePane').hide();
        }
        else if(word !== this.lastWord) {
            this.lookUpBoxWord.innerHTML = word;
            if(_dictionary[word.toUpperCase()] === undefined) {
                this.lookUpBoxDefinition.innerHTML = 'A dictionary definition isn\'t available for the word: \''+word+'\'';
            }
            else {
                this.lookUpBoxDefinition.innerHTML = _dictionary[word.toUpperCase()];
            }
            this.popupOpened = true;
            $(this.lookUpBox).show();
            $('.messagePane').show();
        }
        else if(this.popupOpened === false) {
            this.lookUpBoxWord.innerHTML = word;
            if(_dictionary[word.toUpperCase()] === undefined) {
                this.lookUpBoxDefinition.innerHTML = 'A dictionary definition isn\'t available for the word: \''+word+'\'';
            }
            else {
                this.lookUpBoxDefinition.innerHTML = _dictionary[word.toUpperCase()];
            }
            $(this.lookUpBox).show();
            $('.messagePane').show();
            this.popupOpened = true;
        }
        else {
            $(this.lookUpBox).hide();
            //$('.messagePane').hide();
            this.lookUpBoxWord.innerHTML = word;
            if(_dictionary[word.toUpperCase()] === undefined) {
                this.lookUpBoxDefinition.innerHTML = 'A dictionary definition isn\'t available for the word: \''+word+'\'';
            }
            else {
                this.lookUpBoxDefinition.innerHTML = _dictionary[word.toUpperCase()];
            }
            this.popupOpened = false;
        }
        this.lastWord = word;
    };

}
