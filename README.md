# YouTube Quality Switcher

A lightweight browser extension to quickly change YouTube video playback quality using simple keyboard shortcuts.

## Features

- __Keyboard Shortcuts:__ Change video quality instantly without using the mouse.
- __Lightweight:__ A single, simple content script that runs only on YouTube video pages.
- __Customizable:__ Easily edit the keybindings and language settings.

## How to Use

By default, the following keys are mapped to specific quality settings:

- `Q` ➜ __144p__
- `W` ➜ __360p__
- `E` ➜ __720p__
- `R` ➜ __1080p__

These keys will not trigger if you are typing in a text box (like the comments section or search bar) or if you are holding modifier keys (Ctrl, Alt, Shift).

## Installation (From Source)

Since this extension is not on the Chrome Web Store, you must load it manually in developer mode.

__For Chrome / Edge / Brave:__

1. Create a folder (e.g., `YouTube_Quality_Switcher_Extension`).
2. Inside that folder, create the `manifest.json` file and a `scripts` folder containing `content.js` (as provided in previous steps).
3. Open your browser's extension management page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
4. Enable __Developer mode__ using the toggle switch (usually in the top-right corner).
5. Click the __Load unpacked__ button.
6. Select the entire `YouTube_Quality_Switcher_Extension/` folder you created.

The extension is now installed and active.

## Configuration

You can easily customize the keybindings or language settings by editing the `scripts/content.js` file.

### Changing Keybindings

Open `scripts/content.js` and edit the `qualityMap` object. You can change the keys (e.g., `'q'`) or the target quality strings (e.g., `'1080p HD'`).