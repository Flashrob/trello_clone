# trello_clone

Creating a Trello clone using only web components, vanilla HTML, CSS and JS, without any libraries or frameworks.

## Installation Guide

 1. Install Node.js: `https://nodejs.org/en/`
 2. Install JSON Server via your Command Line Interface(CLI): `npm install -g json-server`
 3. Create a folder, navigate into it via CLI and run: `git clone https://github.com/Flashrob/trello_clone.git`
 4. Run `json-server --watch materials\db.json`
 5. Open the folder on your Windows/Mac and open the index.html via Chrome.

## Usage

 1. Create new cards, by clicking at the bottom of a column
 2. Update card content, by clicking on the card title
 3. Delete cards by clicking on the delete button
 4. Add new columns by using the most right input column
 5. Edit columns by clicking on the edit button on top

 * Json-Server sometimes has a delay in reading the data, therefore content might not appear. Just refresh the window!
 * Use db-backup.json in case you need a new db copy

## Structure of application

 - css
   - style.css
 - js
   - components
     - addColumn.js
     - card.js
     - column.js
   - card-functions.js
   - column-functions.js
   - script.js
 - materials
   - db.json 
   - db-backup.json
 - index.html
 - README.md

## MVP

 - [X] Read Columns
 - [X] Create Columns
 - [X] Update Columns
 - [ ] Delete Columns
 - [X] Read Cards
 - [X] Create Cards
 - [X] Update Cards
 - [X] Delete Cards
 - [ ] Drag and drop cards into columns

 ## Challenges

 1. Rendering components and rendering added elements to these components
 2. Working with the response time of json-server, e.g. response after rendering
 3. Initially working with web components and the shadow DOM
 4. Positioning elements using CSS within web components

 ## Furthers

 1. Deleting Columns. I had it implemented but had to remove the functionality, since I had trouble rerendering columns and cards. Would need to fix and refactor the way, that column and cards are assigned.
 2. Making the app more stable in regards to solid rendering.
 3. Drag and drop.
 4. Mobile responsiveness (Usually mobile first, but due to time constraint I focused on Desktop only)
