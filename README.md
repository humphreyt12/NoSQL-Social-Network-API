# NoSQL-Social-Network-API

## Table of Contents
 * [Description](#Description)
 * [Criteria](#Criteria)
 * [Video](#Video)
 * [Installation](#Installation)
 * [Usage](#Usage)
 * [License](#License)

 ## Description
 Built an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Criteria
```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Video

[Click link to view a demonstration of the API routes](https://vimeo.com/920350286/b2724a6f8a?share=copy)

## Installation
Be sure to have MongoDB installed on your machine. You’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM. Run the following code to install the required packages: 

`npm install`

## Usage 

To use this app open Insomnia and follow the above criteria. 

## License

This project uses MIT License
