import { Request, Response } from "express";
import { pool } from "../config/db";

// Get all projects
export const getProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const projects = await pool.query(
      "SELECT * FROM jobs ORDER BY id DESC"
    );

    res.json(projects.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Create new project
export const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      company,
      position,
      status,
      application_date,
      notes,
    } = req.body;

    const newProject = await pool.query(
      `INSERT INTO jobs
      (company, position, status, application_date, notes)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        company,
        position,
        status,
        application_date,
        notes,
      ]
    );

    res.status(201).json(
      newProject.rows[0]
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};