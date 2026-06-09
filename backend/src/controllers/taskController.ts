import { Request, Response } from "express";
import { pool } from "../config/db";

// Get all tasks
export const getTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks ORDER BY id DESC"
    );

    res.json(tasks.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Create task
export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      due_date,
      status,
      priority,
      assigned_to,
      project_id,
    } = req.body;

    const newTask = await pool.query(
      `INSERT INTO tasks
      (
        title,
        description,
        due_date,
        status,
        priority,
        assigned_to,
        project_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        title,
        description,
        due_date,
        status,
        priority,
        assigned_to,
        project_id,
      ]
    );

    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update task
export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      due_date,
      status,
      priority,
      assigned_to,
      project_id,
    } = req.body;

    const updatedTask = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           due_date = $3,
           status = $4,
           priority = $5,
           assigned_to = $6,
           project_id = $7
       WHERE id = $8
       RETURNING *`,
      [
        title,
        description,
        due_date,
        status,
        priority,
        assigned_to,
        project_id,
        id,
      ]
    );

    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete task
export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM tasks WHERE id = $1",
      [id]
    );

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};