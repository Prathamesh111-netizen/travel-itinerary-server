require("dotenv").config();
 express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello JPMC!");
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    }
);