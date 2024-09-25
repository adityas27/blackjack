// Test console log
console.log('The BlackJack Game');
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
//Main code below 👇👇
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
let blackjackGame = {
    'you': {
        'scoreSpan': '#your-blackjack-result',
        'div': '#your-box',
        'score': 0
    },
    'dealer': {
        'scoreSpan': '#dealer-blackjack-result',
        'div': '#dealer-box',
        'score': 0
    },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
    'cardsMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 10,
        'K': 10,
        'Q': 10,
        'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
}
var balance = 1000
var bet;

function placeBet(betAmount) {
    if (betAmount > balance) {
      alert("You don't have enough funds to place this bet!");
      const betAmount = prompt("Place your bet: ");
      placeBet(betAmount)
      return false;
    } else if (!betAmount){
        alert("Please play some bet! You have $1000 with you.");
      const betAmount = prompt("Place your bet: ");
      placeBet(betAmount)
      return false;
    }
  
    bet = betAmount;
    console.log(`Bet placed: ${bet}, Remaining funds: ${balance}`);
    updateDisplay()
    return true;
  }
const betAmount = prompt("Place your bet: ");
placeBet(betAmount)
  

function updateDisplay() {
  document.getElementById('balance').textContent = `Funds: $${balance-bet}; Bet Amount: $${bet}`;
//   document.getElementById('betDisplay').textContent = `Current Bet: $${bet}`;
}
// Creating a constant value from 'you' key of 'blackjackGame' object
const YOU = blackjackGame['you'];
// Creating a constant value from 'dealer' key of 'blackjackGame' object
const DEALER = blackjackGame['dealer'];
//Sounds
const hitSound = new Audio('sounds/swish.m4a') // sound after generating card and hiting deal
const winSound = new Audio('sounds/cash.mp3') // winning sound
const lossSound = new Audio('sounds/aww.mp3') // losing sound
// for HIT button
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit)
// for DEAL button
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)
// for STAND button
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
// Function to be ran after clicking HIT button
function blackjackhit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard()
        console.log(card)
        showCard(card, YOU)
        updateScore(card, YOU)
        showScore(YOU)
    }
}
//Card Generator
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img')
        cardImage.src = `image/${card}.png`
        cardImage.width = 70
        cardImage.style = "margin: 10px;";
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play() // to play sound when clicking hit button
    }
}
// Function to be ran after clicking DEAL button
function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (var i = 0; i < yourImages.length; i++) {
            yourImages[i].remove()
            hitSound.play()
        }
        for (var i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove()
            hitSound.play()
        }
        YOU['score'] = 0;
        DEALER['score'] = 0

        document.querySelector('#your-blackjack-result').textContent = 0
        document.querySelector('#dealer-blackjack-result').textContent = 0

        document.querySelector('#blackjack-result').textContent = "Lets play!"
        document.querySelector('#blackjack-result').style.color = "black"


        blackjackGame['turnsOver'] = false
    }
}
// Will generate random card
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}
// Update score
function updateScore(card, activePlayer) {
    //CHecking if card is ACE
    if (card == 'A') {
        // if card is ace 
        // if on adding 11 keeps us below 21 then add 11
        // else add 1
        // }
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
// Showing Score to front end
function showScore(activePlayer) {
    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    } else if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = '<span style="color: red;" id="your-blackjack-result"> BUST!</span>'
    }

}
// function to make bot play his after 1 second = 1000 mili second  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// To be taken place after clicking stand button 
async function dealerLogic() {
    blackjackGame['isStand'] = true
    if (blackjackGame['isStand'] === true) {
        while (DEALER['score'] < 15 && blackjackGame['isStand'] === true) {
            let card = randomCard()
            showCard(card, DEALER)
            updateScore(card, DEALER)
            showScore(DEALER)
            await sleep(1000)
        }
    }
    blackjackGame['turnsOver'] = true
    let winner = computeWinner()
    showResult(winner)
    console.log(blackjackGame['turnsOver'])

}
// to decide who won
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // Higher score than dealer or when dealer busts you are 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            console.log('You Won!')
            blackjackGame['wins']++
            console.log('wins ' + blackjackGame['wins'])
            balance += bet * 2;
            console.log(`You won! New balance: ${balance}`);
            winner = YOU
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++
            console.log('losses ' + blackjackGame['losses'])
            console.log('You Lost!')
            balance -= bet;
            console.log(`You lost! Remaining balance: ${balance}`);
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++
            console.log('draws ' + blackjackGame['draws'])
            console.log(`It's a tie! Remaining balance: ${balance}`);
            console.log('You Drew!')
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        // when player busts but the dealer doesn't
        blackjackGame['losses']++
        console.log('losses ' + blackjackGame['losses'])
        console.log('You Lost!');
        balance -= bet;       
        console.log(`You lost! Remaining balance: ${balance}`);
        winner = DEALER;
    }
    // When dealer and player both busts 
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++
        console.log('draws ' + blackjackGame['draws'])
        console.log('You Drew!')
        console.log('draws ' + blackjackGame['draws'])
    }
    console.log('Winner is ', winner);
    updateDisplay()
    if ((balance-bet) < bet){
        console.log("You can't play further hit refresh to start again")
    }
    return winner
}
// to show winner on the front end
function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins']
            message = 'Congratulations! You Won'
            messageColor = 'green'
            winSound.play()
        } else if (winner === DEALER) {
            document.querySelector('#lost').textContent = blackjackGame['losses']
            message = 'Aww! You Lost'
            messageColor = 'red'
            lossSound.play()
        } else {
            document.querySelector('#draw').textContent = blackjackGame['draws']
            message = 'Hmm! You drew'
            messageColor = 'black'
        }
        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
    }
}