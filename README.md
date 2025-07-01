
# 🃏 Blackjack Game

A web-based Blackjack game built using **JavaScript, HTML, and CSS**. This project allows users to place bets, play against the dealer, and track their performance — all through a clean, interactive UI inspired by modern card game apps.

---

## 🎮 How to Play

1. **Place a Bet**
   - Enter an amount into the bet input field.
   - Click **Place Bet** to lock in your wager.
   - Your balance will be updated accordingly.

2. **Game Flow**
   - Click **Hit** to draw another card.
   - Click **Stand** to end your turn and let the dealer play.
   - Click **Deal** to reset the game after each round.

3. **Scoring**
   - Try to get as close to **21** as possible without going over (busting).
   - Face cards (K, Q, J) count as 10, Aces count as 1 or 11.
   - Dealer hits until they reach at least 15.

4. **Win Conditions**
   - You win if:
     - Your score is higher than the dealer’s and ≤ 21.
     - The dealer busts and you don’t.
   - You lose if:
     - You bust.
     - The dealer’s score is higher and ≤ 21.
   - Draw if both scores are equal or both bust.

---

## 💼 Features

- 🎨 Stylish and mobile-friendly user interface
- 💰 Virtual betting system with live balance tracking
- ♠️ Real card images for immersive gameplay
- 🔊 Sound effects for hitting, winning, and losing
- 📊 Scoreboard to track Wins, Draws, and Losses
- 🧠 Dealer logic plays automatically after you stand
- 🧹 Cards and scores reset cleanly after each round

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

---

## 🚀 Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/blackjack-game.git
   cd blackjack-game
   ```

2. Open `index.html` in your browser.

3. Make sure card images are placed inside the `image/` folder (e.g. `image/A.png`, `image/K.png`, etc.).

---

## 📂 Folder Structure

```
blackjack-game/
│
├── image/               # Card images (A.png, 2.png, ..., K.png)
├── sounds/              # Sound effects
│   ├── swish.m4a
│   ├── cash.mp3
│   └── aww.mp3
├── scripts/
│   └── app.js           # Core game logic
├── style.css            # UI styling
├── index.html           # Main UI
└── README.md            # You are here
```

---

### PS : Feel free to fork, modify, and build on top of it! :)
