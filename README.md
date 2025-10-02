🧠 Memory Card Game
A browser-based memory card game built with HTML, CSS, Bootstrap, and TypeScript. Flip cards to find matching pairs, earn points, and enjoy immersive sound and visuals.

🎮 Features
- 20 cards arranged in a 5×4 grid
- Local image assets for card faces
- Numbered card backs
- Progress bar to track score
- Background image and music
- Sound effects for flip, match, fail, and game completion
- Responsive layout using Bootstrap

📁 Project Structure
memory-game/
├── index.html
├── styles.css
├── script.ts
├── tsconfig.json
├── assets/
│   ├── images/            # 20 card images (e.g., 1.png to 20.png)
│   ├── audio/



🚀 Getting Started
1. Clone the repo
git clone https://github.com/your-username/memory-game.git
cd memory-game


2. Install TypeScript (if not already installed)
npm install -g typescript


3. Compile TypeScript
tsc

This will generatescript.js based on your tsconfig.json.


4. Open in browser
Just open index.html in your browser — no server required.

⚙️ TypeScript Configuration
Your tsconfig.json is optimized for modern browser development:
{
  "compilerOptions": {
    /* --- Base Options --- */
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["DOM", "ES2020"],

    /* --- Strict Type-Checking Options --- */
    "strict": true,
    "noImplicitAny": true,

    /* --- Module Resolution Options --- */
    "moduleResolution": "node",
    "esModuleInterop": true,

    /* --- Advanced Options --- */
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    
    /* --- Emitting Files --- */
    "sourceMap": true
  },
  "include": [
    "script.ts"
  ]
}


📦 Dependencies
- Bootstrap 5
- No external JS libraries — pure TypeScript and DOM

📌 To Do / Ideas
- Add timer and move counter
- Add re-shuffle button
- Add leaderboard or high score tracking
- Modularize with ES6 classes and components

🧑‍💻 Author
Fady Tawadrous — .NET Full-Stack Intern.
