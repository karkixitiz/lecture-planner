# Lecture Planner 

An application to allow university students in Kiel to find out possible ways for them to reach their university from current/desired location.

Created for *MI133 Modern Web Development* course, Fachhochschule Kiel.

### Setup
In the terminal, run:
```
npm install
```

### Init or installation dependencies
    - npm init
    - npm i -S react react-dom
    - npm i -D babel-core babel-loader babel-preset-env babel-preset-react  (Install Babel)
    - npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin  (Install webpack)


### Configuring Babel (.babelrc)
    {"presets":["env", "react"]}

### Configuring Webpack (.webpack.config.js)
    const path = require(‘path’);
    const HWP = require(‘html-webpack-plugin’);
    module.exports = {
    entry: path.join(__dirname, ‘/src/index.js’),
    output: {
       filename: ‘build.js’,
       path: path.join(__dirname, ‘/dist’)},
       module:{
          rules:[{
              test: /\.js$/,
              exclude: /node_modules/,
             loader: ‘babel-loader’
           }]
      },
      plugins:[
          new HWP(
             {template: path.join(__dirname,‘/src/index.html’)}
          )
       ]
     }

     
#### As web app:
- Run 
    - `npm start` in the terminal to run both the server and the client
    OR
    - `npm run server` to run the server. 
        - *Note:* MongoDB daemon needs to be running before starting the server
    - `npm run client` to run the client
- Open [http://localhost:8080/](http://localhost:8080/)