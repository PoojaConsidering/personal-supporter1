FocusFlow — Personal Study Supporter
A browser-based productivity app built with React and Vite. FocusFlow combines a Pomodoro timer, a personal music player, and a flashcard system into one focused study environment — no backend, no accounts, everything stored locally in your browser.

Features

Pomodoro Timer — Customizable focus and break intervals with session tracking
Music Player — Upload your own music files and album covers, manage your personal library
Flashcards — Create, organize, and study flashcards sorted by difficulty level (Easy, Medium, Hard)


Tech Stack
LayerTechnologyFrameworkReact 18 (Vite)StylingTailwind CSSState ManagementZustandRoutingReact Router v6Local StorageIndexedDB via idbAudio PlaybackHTML5 Audio / Web Audio API

No backend required. All data (music files, album art, flashcards) is stored locally in the browser using IndexedDB.


Project Structure
focusflow/
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/                    # Static images, icons, default album art
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── pomodoro/
│   │   │   ├── PomodoroTimer.jsx
│   │   │   ├── TimerControls.jsx
│   │   │   ├── TimerSettings.jsx
│   │   │   └── SessionTracker.jsx
│   │   │
│   │   ├── music/
│   │   │   ├── MusicPlayer.jsx
│   │   │   ├── TrackList.jsx
│   │   │   ├── TrackItem.jsx
│   │   │   ├── AlbumCoverUpload.jsx
│   │   │   └── MusicUploader.jsx
│   │   │
│   │   └── flashcards/
│   │       ├── FlashcardDeck.jsx
│   │       ├── FlashcardItem.jsx
│   │       ├── FlashcardForm.jsx
│   │       ├── DifficultyFilter.jsx
│   │       └── CategoryBadge.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── PomodoroPage.jsx
│   │   ├── MusicPage.jsx
│   │   └── FlashcardsPage.jsx
│   │
│   ├── store/
│   │   ├── timerStore.js
│   │   ├── musicStore.js
│   │   └── flashcardStore.js
│   │
│   ├── hooks/
│   │   ├── usePomodoro.js
│   │   ├── useAudioPlayer.js
│   │   └── useFlashcards.js
│   │
│   ├── utils/
│   │   ├── db.js
│   │   ├── formatTime.js
│   │   └── difficultyLevels.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js

Key Dependencies
json"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "zustand": "^4.0.0",
  "idb": "^7.0.0"
},
"devDependencies": {
  "vite": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "postcss": "^8.0.0",
  "autoprefixer": "^10.0.0"
}

Feature Breakdown
Pomodoro Timer

Configurable focus duration (default 25 min) and break duration (default 5 min)
Start, pause, and reset controls
Tracks number of completed sessions

Music Player

Upload local audio files (MP3, WAV, OGG)
Upload custom album artwork per track
Playback controls: play, pause, skip, previous, volume
Persistent library stored in IndexedDB

Flashcards

Create cards with a question and answer
Assign difficulty: Easy / Medium / Hard
Filter and study cards by difficulty level
Full CRUD: create, edit, delete cards


Getting Started
bash# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

Data & Privacy
All your data stays on your device. Music files, album covers, and flashcards are stored in your browser's IndexedDB and are never sent to any server.

Status
🚧 Currently in development

Built by PoojaConsidering