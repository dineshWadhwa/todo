const Tabs = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className="btn-group mb-4">
      <button
        className={`btn btn-outline-primary ${statusFilter === "all" && "active"}`}
        onClick={() => setStatusFilter("all")}
      >
        All Tasks
      </button>
      <button
        className={`btn btn-outline-primary ${
          statusFilter === "completed" && "active"
        }`}
        onClick={() => setStatusFilter("completed")}
      >
        Completed Tasks
      </button>
      <button
        className={`btn btn-outline-primary ${
          statusFilter === "deleted" && "active"
        }`}
        onClick={() => setStatusFilter("deleted")}
      >
        Deleted Tasks
      </button>
    </div>
  );
};
export default Tabs;
