import * as tasksService from "../services/tasksService.js";

/**
 * GET /api/tasks
 */
export const getTasks = async (req, res, next) => {
  try {
    const { tasks, total } = await tasksService.listTasks(
      req.user.id,
      req.query
    );

    res.json({
      success: true,
      meta: {
        total,
        limit: parseInt(req.query.limit) || 10,
        offset: parseInt(req.query.offset) || 0,
      },
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const task = await tasksService.createTask(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/tasks/:id/status
 */
export const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await tasksService.changeTaskStatus(
      req.user.id,
      parseInt(req.params.id),
      req.body.status
    );

    res.json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};
