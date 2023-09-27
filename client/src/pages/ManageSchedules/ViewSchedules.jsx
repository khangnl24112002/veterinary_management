import { Link } from "react-router-dom";

const ViewSchedules = () => {
  return (
    <div>
      View schedules
      <Link
        className="bg-blue-500 text-white px-10 py-2 my-4 rounded hover:bg-blue-600 focus:outline-none"
        to="addNewSchedule"
      >
        Add new schedule
      </Link>
    </div>
  );
};

export default ViewSchedules;
