const Filters = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="btn-group mb-4">
      <button
        className={`btn btn-outline-secondary ${
          timeFilter === "all" && "active"
        }`}
        onClick={() => setTimeFilter("all")}
      >
        All
      </button>
      <button
        className={`btn btn-outline-secondary ${
          timeFilter === "weekly" && "active"
        }`}
        onClick={() => setTimeFilter("weekly")}
      >
        Weekly
      </button>
      <button
        className={`btn btn-outline-secondary ${
          timeFilter === "monthly" && "active"
        }`}
        onClick={() => setTimeFilter("monthly")}
      >
        Monthly
      </button>
    </div>
  );
};
export default Filters;
