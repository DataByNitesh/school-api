import { db } from "../config/db.js";

export const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validation
  if (!name || !address || latitude == null || longitude == null) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }

  const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({ message: "School added successfully" });
  });
};

import { getDistance } from "../utils/distance.js";

export const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude required" });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    const sortedSchools = results
      .map((school) => ({
        ...school,
        distance: getDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude,
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  });
};