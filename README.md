# Stoptube

This project is a proof of concept! I'm not responsible for anything you do with it.

This is meant to be a free Spotify version that can import Spotify playlists and such and play them. This uses YouTube to play songs.

So far you can search for any song and play it. I spent too much time making this thing look good that I didn't really focus on functionality.

I'll keep randomly updating this project but I'm not going to be making frequent updates.

## Images

<details open>
  <img src="https://raw.githubusercontent.com/Nano-AI/Spotube/master/git_images/SC3.png" />
  <img src="https://raw.githubusercontent.com/Nano-AI/Spotube/master/git_images/SC2.png" />
  <img src="https://raw.githubusercontent.com/Nano-AI/Spotube/master/git_images/SC1.png" />
</details>

## Build instructions

1. Clone the repo and cd into it by running `git clone https://github.com/Nano-AI/Spotube.git && cd Spotube`.
2. Then install the required packages by running `yarn`.
3. Once done, run `yarn electron:start`.

## Uses

- Framer Motion
- React
- Tailwind
- React-Icons
- SCSS

## Todo
- [ ] **FIX THE ELECTRON.JS, I HAVE NO CLUE WHY IT'S SPAMMING THE ID SO MUCH. IT'S MAKING THE PROGRAM REALLY SLOW!**
- [X] **FIX BUG WHERE PLAYING MUSIC AND CREATING A PLAYLIST STOPS MUSIC**
- [ ] **FIX OVERFLOW OF PLAYLISTS**
- [ ] **FIX OVERFLOW OF SONGS IN A PLAYLIST**
- [ ] Search for song on enter
- [ ] Full functionality
- [ ] Play playlists
- [ ] Add shuffle to playlists 
- [x] Maybe use framer motion? (maybe with NavLink selection?)
- [X] Import playlists from Spotify
- [X] Make window look better (rounded edges, better titlebar)
- [ ] Add minimum window size
- [ ] Add search channels
- [ ] Search playlists
- [X] Filter for songs only (?)
- [ ] Make search bar it's own component
- [ ] Fix inconsistent naming in code
- [ ] Clean code
- [ ] Align the "Top result" with the songs
- [ ] Setup global styles (like for song and artist names)
- [ ] ~~Cleane Tailwind Config file~~ (Keeping it how it is to add more custom customizability)
- [ ] Add Discord RPC
- [ ] Song invites via Discord (?)
- [ ] Music controls on operating systems (function keys)
