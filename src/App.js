import React, { useMemo, useState } from "react";
import TaskForm from "./Components/TaskForm";
import Tabs from "./Components/Tabs";
import TaskList from "./Components/TaskList";
import Filters from "./Components/Filters";
import { useSelector } from "react-redux";
import { defaultEditState } from "./constants";

const App = () => {
  const { tasks = [] } = useSelector((state) => state.todos) || {};
  const [editState, setEditState] = useState(defaultEditState);
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (statusFilter === "completed") return task.status === "completed";
        if (statusFilter === "deleted") return task.status === "deleted";
        return task.status === "active";
      }),
    [statusFilter, tasks]
  );

  const displayedTasks = useMemo(
    () =>
      filteredTasks.filter(
        (task) => timeFilter === "all" || task.type === timeFilter
      ),
    [filteredTasks, timeFilter]
  );

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">ToDo Application</h1>
      <TaskForm editState={editState} setEditState={setEditState} />
      <div className="d-flex gap-2">
        <Tabs {...{ statusFilter, setStatusFilter }} />
        <Filters {...{ timeFilter, setTimeFilter }} />
      </div>
      <TaskList tasks={displayedTasks} setEditState={setEditState} />
    </div>
  );
};

export default App;
