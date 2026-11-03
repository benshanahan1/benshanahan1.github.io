---
title: "Jot"
pn: "BS-TXT-26"
year: "2026"
lede: "A simple markdown editor for Mac, Windows and Linux."
order: 1
summary: "A simple markdown editor for Mac, Windows and Linux. It renders markdown as you type and stays out of the way."
bullets:
  - "Built with Tauri, so it's small and native"
  - "Open source, with releases for every platform"
links:
  - ["Download", "https://github.com/benshanahan1/jot/releases"]
specs:
  - ["Built with", "Tauri, React, Rust"]
  - ["Download", "<a href=\"https://github.com/benshanahan1/jot/releases\" target=\"_blank\" rel=\"noreferrer\">Releases</a>"]
  - ["Source", "<a href=\"https://github.com/benshanahan1/jot\" target=\"_blank\" rel=\"noreferrer\">GitHub</a>"]
---

<figure class="fig" data-caption="Jot with a short note open."><img class="shot only-light" src="/img/jot-dark.png" alt="Jot editor screenshot" width="1600" height="1244" loading="lazy" /><img class="shot only-dark" src="/img/jot-light.png" alt="Jot editor screenshot" width="1600" height="1244" loading="lazy" /></figure>

I wanted a clean place to write that renders markdown as I type, without a sidebar full of features I'd never use. So Jot is just the page.

## Features

- Live markdown rendering
- Runs on macOS, Windows and Linux
- A few fonts and themes
- Text scaling and zoom
- Keyboard shortcuts for everything

## How it's built

It's a [Tauri](https://tauri.app) app, so it's small and native, with a Rust backend and a React frontend. The editor is built on Milkdown. You can grab a build from the [releases page](https://github.com/benshanahan1/jot/releases).
