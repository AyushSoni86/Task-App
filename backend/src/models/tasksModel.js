import { prisma } from "../config/db.js";

/**
 * Get tasks for a user with filters & pagination
 */
export const getTasks = async ({ userId, status, q, limit, offset }) => {
  const where = {
    userId,
    ...(status && { status }),
    ...(q && {
      title: {
        contains: q,
      },
    }),
  };

  const [tasks, total] = await Promise.all([
    prisma.Task.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" },
    }),
    prisma.Task.count({ where }),
  ]);

  return { tasks, total };
};

/**
 * Create a task
 */
export const createTask = async ({ user_id, title, description, status }) => {
  return prisma.Task.create({
    data: {
      title,
      description,
      status,
      user: {
        connect: { id: user_id },
      },
    },
  });
};

/**
 * Update task status (ownership enforced)
 */
export const updateTaskStatus = async ({ taskId, userId, status }) => {
  const result = await prisma.Task.updateMany({
    where: {
      id: taskId,
      userId,
    },
    data: { status },
  });

  if (result.count === 0) {
    return null;
  }

  return prisma.Task.findUnique({
    where: { id: taskId },
  });
};
