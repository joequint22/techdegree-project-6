document.addEventListener('DOMContentLoaded', () => {

        const qwerty = document.getElementById('qwerty');
        const phrase = document.getElementById('phrase').firstElementChild;
        const startButton = document.querySelector('.btn__reset');
        const overlay = document.getElementById('overlay');
        const scoreboard = document.getElementById('scoreboard');
        const li = scoreboard.children;
      

        let missedCounter = 0;


        let phrases = ["we live in a twilight world and there are no friends at dusk",  "you musnt be afraid to dream a little bigger darling", "parents are the ghosts of their childrens future", "why so serious", "a mans grasp should exceed his nerve"];
        

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
                        overlay.textContent = 'You are a loser!';
                        overlay.style.display = 'flex';
                        missedCounter = 0;
                        return overlay;
                } 
                
                if(letters.length === shownLetters.length){
                                overlay.className = 'win';
                                overlay.textContent = 'You are a winner!';
                                overlay.style.display = 'flex';
                                return overlay;
                        }
               
                

                
        
                
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
                        if ( match === null  && missedCounter < 5){  
                                missedCounter += 1;
                                if(missedCounter === 5){
                                                checkWin();
                                }
                                return missedCounter;

                        } else {
                                checkWin();
                        }    

                
                } 
                        
                
        });
        
                
});