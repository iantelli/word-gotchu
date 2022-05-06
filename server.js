require("dotenv").config();
const app = require('./app.js');

const port = process.env.PORT || 8080;
const url = process.env.URL || `http://localhost:${port}/`

app.listen(port, () => console.log(`Server running on port ${port} \nwebsite: ${url}`));