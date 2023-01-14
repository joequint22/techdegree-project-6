document.addEventListener('DOMContentLoaded', () => {

        const qwerty = document.getElementById('qwerty');
        const phrase = document.getElementById('phrase').firstElementChild;
        const overlay = document.getElementById('overlay');
        const scoreboard = document.querySelector('ol');
        const divSB = document.getElementById('scoreboard');
        const startButton = document.querySelector('.btn__reset');
        // const mainContainer = document.querySelector('.main-container');
        const lmao = document.getElementById('lmao');

        let phrases = ['a', 'aa', 'aaa', 'aaaa', 'aaaaa']
        // let phrases = ["bonsoir",  "bonjour", "bienvenue", "a bientot", "au revior"];

        //Start Over Dom styled button
        const startOver = createElement('button', 'textContent', 'Start Over');
        startOver.style.backgroundColor = 'black';
        startOver.style.color = 'white';
        startOver.className = 'button';
        startOver.style.marginTop ='50px';
        startOver.style.marginBottom ='0px';


        let missedCounter = 0;

        //reseting hearts function
        
        
        //create new element function
        function createElement(element, property, value){
                const newElement = document.createElement(element);
                newElement[property] = value;
                return newElement;
        }

       
        

        // returns a random phrase from the array
        const getRandomPhraseAsArray = arr => {
                // create a variable to store a random number based on the length of the array
                let randomNumber = Math.floor(Math.random() * arr.length);
                //Use that variable to select an index inside of the array.
                let randomIndex = arr[randomNumber];
                const randomPhrase = randomIndex.split('');
                return randomPhrase;

        };


        //At this point, the random phrase is an array
        const randomPhrase = getRandomPhraseAsArray(phrases);
        console.log(getRandomPhraseAsArray(phrases));
       


        // adds the letters of a string to the display 
        const addPhraseToDisplay = arr => {
                for( let i = 0; i < arr.length; i++) {
                        const li = document.createElement('li')
                        li.textContent = arr[i];
                                if(li.textContent !== ' '){
                                         li.className = 'letter';
                                         phrase.appendChild(li);
                                } else {
                                         li.className = 'space';
                                         phrase.appendChild(li);
                                }  
                };                
        };

        // takes the letters off the string 
        const takePhraseOffDisplay = arr => {
                for( let i = 0; i < arr.length; i++) {
                        const li = document.createElement('li')
                        remove(); // this could be the problem???? 
                }
                return arr;
        }
                                

        addPhraseToDisplay(randomPhrase);
          
        // check if a letter is in the phrase 
        const checkLetter = button => {
                const checkLetter = phrase.children;
                let match = null;
                       for( let i=0; i < checkLetter.length; i++){
                                let letter = checkLetter[i];
                                if(button.textContent === letter.textContent){
                                        letter.className = 'show';
                                        match = button.textContent;
                                }
                       } 
                return match;
        }; 
        
        
        // check if the game has been won or lost 
        const checkWin = () => {
                const allChildren = phrase.children; 
                const letters = [];
                const shownLetters = [];
                if (missedCounter < 5) {
                        for(let i=0; i<allChildren.length; i++){
                                const letter = allChildren[i];
                                if(letter.className === 'letter'){
                                        if(letter.className === 'show'){
                                                shownLetters.push[letter];
                                                return;
                                        }
                                letters.push[letter];
                                return letters;
                                }                                             
                        }
                } else {
                        overlay.className = 'lose';
                        overlay.style.display = 'flex';
                        overlay.textContent = 'Sorry, you lost!'
                        overlay.style.font = 'Tahoma'
                        overlay.style.fontSize = '30px'
                        startOver.style.marginBottom = '26.5px';
                        overlay.appendChild(startOver);
                        return;
                } 
                if(letters.length === shownLetters.length){
                        overlay.className = 'win';
                        overlay.style.display = 'flex';
                        overlay.textContent = 'You are a winner!';
                        overlay.style.font = 'Tahoma'
                        overlay.style.fontSize = '30px'
                        startOver.style.marginBottom = '26.5px'
                        overlay.appendChild(startOver);
                        return;                               
                }
        };

        const resetKeys = () => {
                let divs = qwerty.children;
                for(let i=0; i<divs.length; i++){
                        let buttons = divs[i].children;
                        for(let i=0; i<buttons.length; i++){
                                let button = buttons[i];
                                if(button.className === 'chosen'){
                                        button.className = '';
                                }
                        }
                }
                return divs
        };
        
        
       

        //listen for the start game button to be pressed
        startButton.addEventListener('click', () => {
                overlay.style.display = 'none';
                
        });

        // listen for the onscreen keyboard to be clicked
        qwerty.addEventListener('click', e => {
                const click = e.target
                if(click.tagName === 'BUTTON' && click.className !== 'chosen'){
                        click.className = 'chosen';
                        const match = checkLetter(click);
                        if ( match === null && missedCounter < 5){  
                                missedCounter += 1;
                                if(missedCounter === 5){
                                        checkWin();
                                } else {
                                      for(const lis of lmao.children){
                                                const img = lis.firstChild;
                                                img.src = 'images/lostHeart.png'
                                                // return img
                                        }
                                }
                        } else {
                                checkWin();
                        }
                              
                } 
        }); 

        //reset hearts
        const reset = (arr, value) => {
                for(const lis of arr.children){
                        for(const img of lis.children){
                                 img.src = `'${value}'`; 
                        }                             
                }
                return arr;
        }
        

        const newPhraseButton = () => {
                const phraseBtn = createElement('button', 'className', '.button')
                phraseBtn.textContent = 'New Phrase';
                phraseBtn.style.marginRight = '100px';
                phraseBtn.style.diplay = 'flex';
                return phraseBtn;
        }


        //listen for the start over button to be pressed
        startOver.addEventListener('click', () => {
                missedCounter = 0
                overlay.style.zIndex = '-1';
                const phraseBtn = newPhraseButton();
                divSB.insertBefore(phraseBtn, scoreboard);                    
                reset(lmao);
                resetKeys();
                const random = getRandomPhraseAsArray(phrases);
                takePhraseOffDisplay(phrase)
                addPhraseToDisplay(random);

                return;
                
                
                
        });            
});