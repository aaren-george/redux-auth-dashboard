# react-todo

This is a demo application boilerplate for usage in your own setups. This is not a boilerplate to create your own application.

# Used In

- [spa-starter-kit](https://github.com/vutran/spa-starter-kit/) (Web Application)
- [electron-webpack-boilerplate](https://github.com/vutran/electron-webpack-boilerplate) (Electron Desktop Application)

# Install

````
npm install --save-dev react-todo
````

# Usage

````javascript
import React from 'react'
import ReactDOM from 'react-dom'

// Import the app boilerplate
import { Root, configureStore, rootReduce } from 'react-todo'

// Create the store
const store = configureStore()

// Render to the #app element
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('app')
)
````
