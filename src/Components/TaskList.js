import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMultipleTaskStatus, updateTaskStatus } from "../redux/slices/todosSlice";

const statusColors = {
  active: "secondary",
  completed: "success",
  deleted: "danger",
};
const TaskList = ({ tasks = [], setEditState = () => {} }) => {
  const dispatch = useDispatch();
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const handleSelection = (id) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    );
  };

  const updateTaskStatusFn = useCallback(
    (id, status) => {
      try {
        dispatch(updateTaskStatus({ id, status }));
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    },
    [dispatch]
  );
  const updateMultipleTaskStatusFn = (status) => {
    if (!selectedTaskIds.length) return alert("No tasks selected!");
    try {
      dispatch(updateMultipleTaskStatus({ ids: selectedTaskIds, status }));
      setSelectedTaskIds([]);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success btn-sm me-2"
          onClick={() => updateMultipleTaskStatusFn("completed")}
        >
          Complete Selected
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => updateMultipleTaskStatusFn("deleted")}
        >
          Delete Selected
        </button>
      </div>
      <ul className="list-group">
        {!Boolean(tasks.length) && (
          <div className="text-center">
            <strong>No records</strong>
          </div>
        )}
        {tasks.map((task) => {
          const { id, title, status, date, type } = task || {};
          return (
            <li
              key={id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                {status === "active" && (
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={selectedTaskIds.includes(id)}
                    onChange={() => handleSelection(id)}
                  />
                )}
                <b>{title}</b> - {date} - {type}
              </div>
              <span className={`badge bg-${statusColors[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              {status === "active" && (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button
                    className="btn btn-primary btn-sm "
                    onClick={() =>
                      setEditState({
                        isEdit: true,
                        rowData: { ...task },
                        oldTitle: task.title,
                      })
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-success btn-sm "
                    onClick={() => updateTaskStatusFn(id, "completed")}
                  >
                    Complete
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateTaskStatusFn(id, "deleted")}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default TaskList;
