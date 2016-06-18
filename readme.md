# Sleeve Up App

### A Magic: The Gathering deck building application using https://www.echomtg.com



## Setting up a OSX Environment
Open your terminal

Install Homebrew, its an APT-GET equivalent for OSX, you need to install a local environment. run the command below. Learn more: http://brew.sh/
```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
Install local environment

Git for code version control
```brew install git```
NVM is a node version manager https://github.com/creationix/nvm
```brew install nvm```
Install Node with NVM
```nvm install 5.0```
```nvm use 5.0```
```nvm alias default node```

NPM is a node package manager
```brew install npm```
Bower is a javascript module package manager, mostly used for javascript packages. https://bower.io/
```brew install npm```
Elastic search
```brew install elasticsearch```

## Installing and running Sleeveup Locally

Fork this repo and pull it down into a folder on your local computer. Using a tool like Github Desktop is helpful.

From the folder you will be store the repo
```git pull [YOUR REMOTE REPO URL]```
```npm install -g grunt-cli```
```npm install -g bower```
```npm install```
```bower install```

In one tab run `grunt build:watch` - When it says `Running "watch" task` open a new tap and run `npm start`

Make all your changes under `src/` and it will compile into `angular/`.
