// Create web server
// Import express module
const express = require('express');
// Create an express application
const app = express();
// Import the path module
const path = require('path');
// Import the fs module
const fs = require('fs');
// Import the body-parser module
const bodyParser = require('body-parser');

// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set the path to the views
app.set('views', path.join(__dirname, 'views'));

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set the path to the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Get the comments from the comments.json file
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Get the comments route
app.get('/comments', (req, res) => {
  res.render('comments', { comments });
});

// Post the comments route
app.post('/comments', (req, res) => {
  // Get the name and comment from the request body
  const name = req.body.name;
  const comment = req.body.comment;
  // Push the name and comment to the comments array
  comments.push({ name, comment });
  // Write the comments array to the comments.json file
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  // Redirect to the comments route
  res.redirect('/comments');
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});