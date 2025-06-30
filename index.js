const express = require('express');
const fs = require('fs-extra');
const app = express();
const config = require('./config.json');

let boosterData = {};

const loadBoosters = async () => {
  try {
    boosterData = await fs.readJson('./boosters.json');
  } catch (err) {
    boosterData = {};
  }
};

loadBoosters();
setInterval(loadBoosters, 10 * 1000); // Reload every 10s

// GET /isBooster/:userId
app.get('/isBooster/:userId', (req, res) => {
  const userId = req.params.userId;
  const booster = boosterData[userId];

  let isBooster = false;

  if (config.method === 'role') {
    isBooster = booster?.roles?.includes(config.testRoleId);
  } else if (config.method === 'nitro') {
    isBooster = booster?.premium_since != null;
  }

  res.json({ userId, isBooster });
});

// GET /all
app.get('/all', (req, res) => {
  res.json(boosterData);
});

app.listen(config.port, () => {
  console.log(`[Booster API] Running on port ${config.port}`);
});
