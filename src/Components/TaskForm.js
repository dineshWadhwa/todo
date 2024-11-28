import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/slices/todosSlice";
import { defaultEditState, formIntialState } from "../constants";

const TaskForm = ({ editState, setEditState }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(formIntialState);

  const { date, title, type } = formData;

  const { isEdit, rowData, oldTitle } = useMemo(() => editState, [editState]);

  useEffect(() => {
    if (isEdit) {
      setFormData(rowData);
    }
  }, [isEdit, rowData]);

  const handleChange = useCallback((name, value) => {
    setFormData((p) => ({ ...p, [name]: value }));
  }, []);

  const addTaskFn = useCallback(
    (data) => {
      const { title, date, type } = data;
      try {
        dispatch(
          addTask({
            title,
            date,
            type,
          })
        );
      } catch (error) {
        console.error("Failed to add task :", error);
      }
    },
    [dispatch]
  );

  const editTaskFn = useCallback(
    (data) => {
      const { oldTitle, title, date, type, taskIndex, id } = data;
      try {
        dispatch(
          editTask({
            id,
            title,
            date,
            type,
            taskIndex,
            oldTitle,
          })
        );
        setEditState(defaultEditState);
      } catch (error) {
        console.error("Failed to edit task :", error);
      }
    },
    [dispatch]
  );

  const handleSubmit = (_) => {
    _.preventDefault();
    if (isEdit) {
      editTaskFn({
        ...formData,
        oldTitle,
      });
    } else {
      addTaskFn(formData);
    }
    setFormData(formIntialState);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task Title"
            value={title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => handleChange("date", e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={type}
            onChange={(e) => handleChange("type", e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {isEdit ? "Edit Task" : "Add Task"}
          </button>
        </div>
        <div className="col-md-2">
          {isEdit && (
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => {
                setEditState(defaultEditState);
                setFormData(formIntialState);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
export default TaskForm;
