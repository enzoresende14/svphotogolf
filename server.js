const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// API route: returns all images from /public/portfolio
app.get("/api/portfolio-images", (req, res) => {
  const folderPath = path.join(__dirname, "public", "portfolio");

  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading portfolio folder:", err);
      return res.status(500).json({ error: "Cannot read portfolio folder" });
    }

    const imageFiles = files.filter(file =>
      validExtensions.includes(path.extname(file).toLowerCase())
    );

    const imageUrls = imageFiles.map(file => `/portfolio/${file}`);

    res.json(imageUrls);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
