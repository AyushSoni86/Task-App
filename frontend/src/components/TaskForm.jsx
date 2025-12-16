import { Loader2 } from "lucide-react";

const TaskForm = ({ newTask, setNewTask, onSubmit, onCancel, submitting }) => {
  return (
    <div className="border-t border-slate-200 pt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Create New Task
      </h3>
      <div className="grid gap-4">
        <div>
          <label className="block text-left text-lg font-medium text-slate-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter task title"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-left text-lg font-medium text-slate-700 mb-1.5">
            Description (Optional)
          </label>
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Enter task description"
            rows="3"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            disabled={submitting || !newTask.title.trim()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Task
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
