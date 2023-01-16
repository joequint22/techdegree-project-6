document.addEventListener('DOMContentLoaded', () => {
	const qwerty = document.getElementById('qwerty');
	const phrase = document.getElementById('phrase').firstElementChild;
	const overlay = document.getElementById('overlay');
	const scoreboard = document.querySelector('ol');
	const divSB = document.getElementById('scoreboard');
	const startButton = document.querySelector('.btn__reset');
	const lis = document.querySelectorAll('.tries');

	// let phrases = ['qwerty', 'qewrty', 'qwerty', 'qwerty', 'qwerty']
	let phrases = ['bonsoir', 'bonjour', 'bienvenue', 'a bientot', 'au revior'];

	//Start Over Dom styled button
	const startOver = createElement('button', 'textContent', 'Start Over');
	startOver.style.backgroundColor = 'black';
	startOver.style.color = 'white';
	startOver.className = 'button';
	startOver.style.marginTop = '50px';
	startOver.style.marginBottom = '0px';

	let missedCounter = 0;

	//create new element function
	function createElement(element, property, value) {
		const newElement = document.createElement(element);
		newElement[property] = value;
		return newElement;
	}

	//new phrase button
	// const newPhraseButton = () => {
	//         const phraseBtn = createElement('button', 'className', '.button')
	//         phraseBtn.textContent = 'New Phrase';
	//         phraseBtn.style.marginRight = '100px';
	//         phraseBtn.style.diplay = 'flex';
	//         return phraseBtn;
	// }

	// returns a random phrase from the array
	const getRandomPhraseAsArray = (arr) => {
		// create a variable to store a random number based on the length of the array
		let randomNumber = Math.floor(Math.random() * arr.length);
		//Use that variable to select an index inside of the array.
		let randomIndex = arr[randomNumber];
		const randomPhrase = randomIndex.split('');
		return randomPhrase;
	};

	//At this point, the random phrase is an array

	const randomPhrase = getRandomPhraseAsArray(phrases);
	console.log(randomPhrase);

	// adds the letters of the string to the display
	const addPhraseToDisplay = (arr) => {
		for (let i = 0; i < arr.length; i++) {
			const li = document.createElement('li');
			li.textContent = arr[i];
			if (li.textContent !== ' ') {
				li.className = 'letter';
				phrase.appendChild(li);
			} else {
				li.className = 'space';
				phrase.appendChild(li);
			}
		}
	};

	addPhraseToDisplay(randomPhrase);

	// takes the letters off the string
	const takePhraseOffDisplay = (arr) => {
		const letters = arr.children;
		for (let i = 0; i < letters.length; i++) {
			const letter = letters[i];
			arr.removeChild(letter);
		}
	};

	// check if a letter is in the phrase
	const checkLetter = (button) => {
		const checkLetter = phrase.children;
		let match = null;
		for (let i = 0; i < checkLetter.length; i++) {
			let letter = checkLetter[i];
			if (button.textContent === letter.textContent) {
				letter.className = 'show';
				match = button.textContent;
			}
		}
		return match;
	};

	// check if the game has been won or lost
	const checkWin = () => {
		const allChildren = phrase.children;
		// const letters = [];
		// const shownLetters = [];

		if (missedCounter < 5) {
			for (let i = 0; i < allChildren.length; i++) {
				const letter = allChildren[i];
				if (letter.className !== 'show' && letter.className !== 'space') {
					return; //returns to the game once it iterates through a letter that hasnt been chose, therefore does not have the show class
				}
			}
			overlay.className = 'win';
			overlay.style.display = 'flex';
			overlay.textContent = 'You are a winner!';
			overlay.style.font = 'Tahoma';
			overlay.style.fontSize = '30px';
			startOver.style.marginBottom = '26.5px';
			overlay.appendChild(startOver);
			overlay.style.zIndex = '0';
			qwerty.style.zIndex = '-1';
			return;
		} else {
			overlay.className = 'lose';
			overlay.style.display = 'flex';
			overlay.textContent = 'Sorry, you lost!';
			overlay.style.font = 'Tahoma';
			overlay.style.fontSize = '30px';
			startOver.style.marginBottom = '26.5px';
			overlay.appendChild(startOver);
			overlay.style.zIndex = '0';
			qwerty.style.zIndex = '-1';
			return;
		}
	};

	const resetKeys = () => {
		let divs = qwerty.children;
		for (let i = 0; i < divs.length; i++) {
			let buttons = divs[i].children;
			for (let i = 0; i < buttons.length; i++) {
				let button = buttons[i];
				if (button.className === 'chosen') {
					button.className = '';
				}
			}
		}
		return divs;
	};

	//listen for the start game button to be pressed
	startButton.addEventListener('click', () => {
		overlay.style.display = 'none';
		// newPhraseButton();
	});

	// listen for the onscreen keyboard to be clicked
	qwerty.addEventListener('click', (e) => {
		const click = e.target;
		if (click.tagName === 'BUTTON' && click.className !== 'chosen') {
			click.className = 'chosen';
			const match = checkLetter(click);
			if (match === null && missedCounter < 5) {
				missedCounter += 1;
				if (missedCounter === 5) {
					checkWin();
				} else {
					for (let i = missedCounter - 1; i < lis.length; i++) {
						li = lis[i];
						const img = li.firstElementChild;
						if (img.src !== 'images/lostHeart.png') {
							img.src = 'images/lostHeart.png';
							return img;
						}
					}
				}

				return missedCounter;
			} else {
				checkWin();
			}
		}
	});

	//reset hearts
	const reset = (arr) => {
		for (let i = 0; i < arr.length; i++) {
			const li = arr[i];
			const img = li.firstElementChild;
			img.src = 'images/liveHeart.png';
		}
		return arr;
	};

	// shows user a new phrase
	// const newPhrase = newPhraseButton();
	// newPhrase.addEventListener('click', () => {
	//         missedCounter = 0;
	//         reset(lis);
	//         resetKeys();
	//         const random = getRandomPhraseAsArray(phrases);
	//         addPhraseToDisplay(random);
	//         takePhraseOffDisplay(phrase)
	//         return;
	// });

	//listen for the start over button to be pressed
	startOver.addEventListener('click', () => {
		missedCounter = 0;
		if (overlay.className === 'win' || overlay.className === 'lose') {
			overlay.className = '';
			overlay.style.zIndex = '-1';
			qwerty.style.zIndex = '0';
		}
		reset(lis);
		resetKeys();
		takePhraseOffDisplay(randomPhrase);
		const newRandomPhrase = getRandomPhraseAsArray(phrases);
		addPhraseToDisplay(newRandomPhrase);

		return;
	});
});
