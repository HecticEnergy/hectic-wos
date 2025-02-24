# Hectic WOS

_This project was setup to be a combination of tools for Whiteout Survival_

## Table of Contents

- [Hectic WOS](#hectic-wos)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Development](#development)
  - [Pushing Code](#pushing-code)
  - [Features](#features)
    - [March Time Calculator](#march-time-calculator)
    - [Ministry Appointments](#ministry-appointments)

## Install

```bash
git checkout ...
npm install
```

## Development

- I use [VS Code](https://code.visualstudio.com/download) for this repository, recommended extensions help with Vue/Vuetify/eslint/prettier etc

```bash
npm run lint #runs eslint, fix the errors, try to keep the warnings down
npm run dev #start vite instance, serving the app locally
```
- The project is setup to use Vue 3, with the auto import, pages, and auto routes
- [Vuetify](https://vuetifyjs.com/en/components/cards/#usage) was used to get started quickly with prepackaged components and ([material](https://m3.material.io/)) styles

## Pushing Code
- once you're ready to see your feature hosted, to should be available on 
  - https://[branch-name].hectic-wos.pages.dev/MarchTimesNewPage

## Features

### March Time Calculator
> Import your march data - have your members send it to you in the appropriate format and paste it in.  
>
> Set up your march settings for the appropriate type and it will calculate a message for you to copy and send in chat with when rallies should be called.  
>
> Originally designed for Sun Fire Castle battles, it also allows you to import for a single target to time marches for longer Fortress/Stronghold/Facility battles.  


### Ministry Appointments
> Import data to organize who is getting ministry appointments!
