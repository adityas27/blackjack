// Refactored Blackjack Game Code with UI-based betting and clean card containers

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
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
};

var balance = 1000;
var bet = 0;

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.addEventListener('DOMContentLoaded', () => renderBetUI());

function renderBetUI() {
    const existing = document.querySelector('.betting-ui');
    if (existing) existing.remove();

    const container = document.querySelector('.container');
    const betDiv = document.createElement('div');
    betDiv.className = 'betting-ui text-center mb-4';
    betDiv.innerHTML = `
        <input type="number" id="bet-input" placeholder="Enter your bet" class="form-control d-inline bet-input">
        <button id="place-bet-button" class="btn btn-warning ml-2">Place Bet</button>
        <div id="bet-warning" class="text-danger mt-2"></div>
    `;
    container.insertBefore(betDiv, container.children[2]);

    document.querySelector('#place-bet-button').addEventListener('click', () => {
        const betInput = document.querySelector('#bet-input').value;
        const warning = document.querySelector('#bet-warning');
        if (!betInput || betInput <= 0 || betInput > balance) {
            warning.textContent = `Invalid bet. You have $${balance}`;
        } else {
            bet = parseInt(betInput);
            warning.textContent = '';
            updateDisplay();
        }
    });
}

function updateDisplay() {
    document.getElementById('balance').textContent = `Funds: $${balance - bet}; Bet Amount: $${bet}`;
}

function blackjackhit() {
    if (blackjackGame['isStand'] === false && bet > 0) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;

        document.getElementById('your-cards').innerHTML = '';
        document.getElementById('dealer-cards').innerHTML = '';

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#blackjack-result').textContent = "Let's play!";
        document.querySelector('#blackjack-result').style.color = "white";

        blackjackGame['turnsOver'] = false;
        updateDisplay();
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `image/${card}.png`;
        cardImage.classList.add('card-img');
        let containerId = activePlayer === YOU ? 'your-cards' : 'dealer-cards';
        document.getElementById(containerId).appendChild(cardImage);
        hitSound.play();
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } else {
        document.querySelector(activePlayer['scoreSpan']).innerHTML = `<span style="color:red;">BUST!</span>`;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 15 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            balance += bet * 2;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            balance -= bet;
            winner = DEALER;
        } else {
            blackjackGame['draws']++;
        }
    } else if (DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        balance -= bet;
        winner = DEALER;
    } else {
        blackjackGame['draws']++;
    }

    updateDisplay();
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'Congratulations! You Won';
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#lost').textContent = blackjackGame['losses'];
            message = 'Aww! You Lost';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draw').textContent = blackjackGame['draws'];
            message = 'Hmm! You drew';
            messageColor = 'yellow';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
