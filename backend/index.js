const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

//CORS so that servers running on different ports can communicate
app.use(cors());

// Default Api end point to return default api form values
app.get("/api/form-data", (req, res) => {
  res.json({
    quantity: 2,
    price: 25,
    total: 40,
    profit: "11%",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
