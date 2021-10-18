import React, { useCallback, useState, useEffect } from "react";
import { previous, today, next } from "../utils/date-time"; // these functions will give the day before, the day today, and the next day, respectively.
import { useHistory } from "react-router-dom";
import ListReservations from "./ListReservations";
import ListTables from "./ListTables";
import { listReservations } from "../utils/api";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  //useCallback is a hook that stores the variable loadDashboard in memory of the anonymous callback function
  const loadDashboard = useCallback(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }, [date]);

  useEffect(loadDashboard, [loadDashboard]);

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
      <ListReservations
        date={date}
        reservations={reservations}
        reservationsError={reservationsError}
      />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ListTables date={date} />
    </main>
  );
}

export default Dashboard;
