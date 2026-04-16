import { db } from "../config/db.js";

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({ error: "All fields required" });
    }

    await db.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude],
    );

    res.json({ message: "School added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB error" });
  }
};

import { getDistance } from "../utils/distance.js";

export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const [rows] = await db.query("SELECT * FROM schools");

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB error" });
  }
};