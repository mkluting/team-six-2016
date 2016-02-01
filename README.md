# Voyage Manager

A Node.js web application intended to run on Raspberry Pi hardware.

# Requirements

 - [Node.js][1] `>= 4.2.6`
 - [MySQL][2] `>= 5.5.47`

Installing Node.js and/or MySQL on your platform of choice is beyond the scope of this document.

# Getting Started

```bash
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

[1]: https://nodejs.org/en/
[2]: https://www.mysql.com/products/community/
