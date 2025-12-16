import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import TaskTable from "../components/TaskTable";
import Pagination from "../components/Pagination";
import TaskForm from "../components/TaskForm";
import RecordsPerPageSelector from "../components/RecordPerPageSelector";
import StatusFilter from "../components/StatusFilter";
import SearchBar from "../components/SearchBar";

// API Configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const TasksApp = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  // New Task Form
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        limit,
        offset,
        ...(statusFilter && { status: statusFilter }),
        ...(searchQuery && { q: searchQuery }),
      };

      const response = await api.get("/tasks", { params });
      setTasks(response.data.data);
      setTotal(response.data.meta.total);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [offset, statusFilter, limit]);

  // Handle search
  const handleSearch = () => {
    setOffset(0);
    fetchTasks();
  };

  // Handle filter change
  const handleFilterChange = () => {
    setOffset(0);
  };

  // Handle limit change
  const handleLimitChange = () => {
    setOffset(0);
  };

  // Create new task
  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return;

    setSubmitting(true);
    try {
      await api.post("/tasks", {
        title: newTask.title,
        description: newTask.description || undefined,
      });
      setNewTask({ title: "", description: "" });
      setShowNewTaskForm(false);
      setOffset(0);
      fetchTasks();
    } catch (err) {
      setError("Failed to create task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Advance status
  const advanceStatus = async (taskId, currentStatus) => {
    const statusFlow = {
      OPEN: "IN_PROGRESS",
      IN_PROGRESS: "DONE",
      DONE: "DONE",
    };

    const newStatus = statusFlow[currentStatus];
    if (newStatus === currentStatus) return;

    try {
      await api.patch(`/tasks/${taskId}/status`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError("Failed to update task status.");
    }
  };

  const handleCancelForm = () => {
    setShowNewTaskForm(false);
    setNewTask({ title: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Tasks & Notes
          </h1>
          <p className="text-slate-600">Manage your tasks efficiently</p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6 flex-wrap">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />

            <StatusFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onFilterChange={handleFilterChange}
            />

            <RecordsPerPageSelector
              limit={limit}
              setLimit={setLimit}
              onLimitChange={handleLimitChange}
            />

            <button
              onClick={() => setShowNewTaskForm(!showNewTaskForm)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              New Task
            </button>
          </div>

          {showNewTaskForm && (
            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              onSubmit={handleCreateTask}
              onCancel={handleCancelForm}
              submitting={submitting}
            />
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tasks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-3 text-slate-600">Loading tasks...</span>
            </div>
          ) : (
            <>
              <TaskTable tasks={tasks} onAdvanceStatus={advanceStatus} />

              {tasks.length > 0 && (
                <Pagination
                  offset={offset}
                  limit={limit}
                  total={total}
                  onPageChange={setOffset}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksApp;
