# Nothing but Demons
Nothing but Demons is an action role-playing hack and slash video game playable in the browser.

### Prerequisites
to run this project you will need the following programs installed:
* npm, to install the various modules needed to either run the server or generate documentation
* node, these modules require nodejs installed
* php, needed for the leaderboards
* mysql, needed for the database

### How To Use
To use this program you will need to have a http server installed.
Or follow these few steps to install one using npm however this requires that you have npm and nodejs installed.

```bash
# Install the Prerequisites - based upon ubuntu
$ sudo apt install php
$ sudo apt install mysql
$ sudo apt install php-mysql
$ sudo apt install node
$ sudo apt install npm

# Clone the github repository
$ git clone https://github.com/Peter-van-der-Velde/c3.git

# Go inside the repository
$ cd c3/

# Install the dependencies
$ npm install

# To start the http-server with the nodejs http-server
$ npm start

# Fist setup the php server
$ npm run php-install

# To actually run the server
$ npm start php-server
```

### Documentation
This project uses jsdoc for the documentation.

To generate the documentation files run:
```bash
npm run doc
```
For more information on how to use JSDOC see 'How to use JSDOC.md'.


## Built With
* [THREE.JS](https://threejs.org/) - The web framework used for the 3d graphics


### License
This project is licensed under the ZLIB License - see the [LICENSE.md](LICENSE.md) file for details

