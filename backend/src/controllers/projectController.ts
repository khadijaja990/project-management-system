import { Request, Response } from "express";
import { pool } from "../config/db";

export const getProjects = async (
  req: Request,
  res: Response
) => {
  try {
    const projects = await pool.query(
      "SELECT * FROM projects ORDER BY id DESC"
    );

    res.json(projects.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      company,
      status,
      application_date,
      notes,
    } = req.body;

    const newProject = await pool.query(
      `INSERT INTO projects
      (name, description, start_date, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        company,
        notes,
        application_date,
        status,
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

export const updateProject = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      company,
      status,
      application_date,
      notes,
    } = req.body;

    const updatedProject = await pool.query(
      `UPDATE projects
       SET name = $1,
           description = $2,
           start_date = $3,
           status = $4
       WHERE id = $5
       RETURNING *`,
      [
        company,
        notes,
        application_date,
        status,
        id,
      ]
    );

    res.json(updatedProject.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM projects WHERE id = $1",
      [id]
    );

    res.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};