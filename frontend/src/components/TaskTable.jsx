import { CheckCircle2, Circle } from "lucide-react";
import StatusBadge from "./StatusBadge";

// Task Table Component
const TaskTable = ({ tasks, onAdvanceStatus }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-slate-400 mb-2">
          <Circle className="w-16 h-16 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-medium text-slate-700 mb-1">
          No tasks found
        </h3>
        <p className="text-slate-500">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
              Title
            </th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
              Description
            </th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
              Status
            </th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
              Created At
            </th>
            <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50 transition">
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800">{task.title}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-slate-600 text-sm max-w-xs truncate">
                  {task.description || (
                    <span className="text-slate-400 italic">
                      No description
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4">
                <div className="text-slate-600 text-sm">
                  {new Date(task.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </td>
              <td className="px-6 py-4">
                {task.status !== "DONE" && (
                  <button
                    onClick={() => onAdvanceStatus(task.id, task.status)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium border border-blue-200"
                  >
                    Advance Status
                  </button>
                )}
                {task.status === "DONE" && (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
