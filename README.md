# Voyage Manager

A Node.js web application intended to run on Raspberry Pi hardware.

# Requirements

 - [Git][1] `>= 1.9.1`
 - [Node.js][2] `>= 4.2.6`
 - [MySQL][3] `>= 5.5.47`

Installing Git, Node.js and/or MySQL on your platform of choice is beyond the scope of this document.

# Getting Started

Terminal commands!

```bash
# Clone this repository
$ git@github.com:hackmt/team-six-2016.git

# Navigate to your freshly-cloned repo directory
$ cd team-six-2016

# Import database structure
$ mysql -e "create database voyage";
$ mysql voyage < voyage-initial-db-structure.sql

# Install dependencies
$ npm install

# Run server.
# Navigate to http://localhost:8080 in your favorite browser!
$ node app.js

# Tired of re-running "node app.js" over and over? Use nodemon!
$ npm run auto-reload
```

[1]: https://git-scm.com/
[2]: https://nodejs.org/en/
[3]: https://www.mysql.com/products/community/
