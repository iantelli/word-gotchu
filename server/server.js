require("dotenv").config();

const app = require("./app.js");

const PORT = process.env.PORT || 8080;
const URL = process.env.URL || `http://localhost:${PORT}/`  

app.listen(PORT, () => console.log(`Server running on port ${PORT} \nwebsite: ${URL}`));