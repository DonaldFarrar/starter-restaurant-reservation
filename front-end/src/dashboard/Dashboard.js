import React from "react";
import { previous, today, next } from "../utils/date-time"; // these functions will give the day before, the day today, and the next day, respectively.
import { useHistory } from "react-router-dom";
import ListReservations from "./ListReservations";
import ListTables from "./ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();

  return (
    <main>
      <h1>Dashboard</h1>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        Next
      </button>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ListReservations date={date} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ListTables />
    </main>
  );
}

export default Dashboard;
