import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  titleSet: {},
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, date, type } = action.payload;
      if (state.titleSet[title.toLowerCase()]) {
        alert("Task with the same title already exists!");
        return state;
      }
      const newTask = {
        title,
        date,
        type,
        status: "active",
        id: Math.random(),
      };
      state.tasks = [newTask, ...state.tasks];
      state.titleSet = { ...state.titleSet, [title.toLowerCase()]: title };
      return state;
    },
    editTask: (state, action) => {
      const { oldTitle, title, date, type, id } = action.payload;
      if (state.titleSet[title.toLowerCase()]) {
        alert("Task with the same title already exists!");
        return state;
      }
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], title, date, type };

        delete state.titleSet[oldTitle.toLowerCase()];
        state.titleSet = { ...state.titleSet, [title.toLowerCase()]: title };
        return state;
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }
    },

    updateMultipleTaskStatus: (state, action) => {
      const { ids, status } = action.payload;
      ids.forEach((id) => {
        const taskIndex = state.tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex].status = status;
        }
      });
    },
  },
});

export const { addTask, editTask, updateTaskStatus, updateMultipleTaskStatus } =
  todosSlice.actions;

export default todosSlice.reducer;
