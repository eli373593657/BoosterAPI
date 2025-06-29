const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/boostercheck", (req, res) => {
    const robloxId = req.query.robloxId;
    if (!robloxId) return res.status(400).json({ error: "Missing robloxId" });

    try {
        const data = JSON.parse(fs.readFileSync("./boosters.json", "utf8"));
        const booster = data[robloxId] && data[robloxId].active === true;
        return res.json({ booster });
    } catch (err) {
        console.error("Error reading boosters.json:", err);
        return res.status(500).json({ error: "Server error" });
    }
});
