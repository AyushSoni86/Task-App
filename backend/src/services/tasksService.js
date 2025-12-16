import * as tasksModel from "../models/tasksModel.js";

const MAX_LIMIT = 50;

export const listTasks = async (userId, query) => {
  const limit = Math.min(parseInt(query.limit) || 10, MAX_LIMIT);
  const offset = parseInt(query.offset) || 0;
  const status = query.status || undefined;
  const q = query.q || undefined;

  return tasksModel.getTasks({
    userId,
    status,
    q,
    limit,
    offset,
  });
};

export const createTask = async (userId, body) => {
  if (!body.title) {
    const err = new Error("Title is required");
    err.statusCode = 400;
    throw err;
  }

  return tasksModel.createTask({
    user_id: userId,
    title: body.title,
    description: body.description || null,
    status: "OPEN",
  });
};

export const changeTaskStatus = async (userId, taskId, status) => {
  if (!["OPEN", "IN_PROGRESS", "DONE"].includes(status)) {
    const err = new Error("Invalid status value");
    err.statusCode = 400;
    throw err;
  }

  const updated = await tasksModel.updateTaskStatus({
    taskId,
    userId,
    status,
  });

  if (!updated) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  return updated;
};
