import React, { useEffect, useState } from "react";
// import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
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
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // useEffect(loadDashboard, [date]);

  // function loadDashboard() {
  //   const abortController = new AbortController();
  //   setReservationsError(null);
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError);
  //   return () => abortController.abort();
  // }

  // const listOfReservations = reservations.map((reservation, index) => {
  //   return (
  //     <tr id={reservation.reservation_id} key={index}>
  //       <td>{reservation.first_name}</td>
  //       <td>{reservation.last_name}</td>
  //       <td>{reservation.mobile_number}</td>
  //       <td>{reservation.reservation_date}</td>
  //       <td>{reservation.reservation_time}</td>
  //       <td>{reservation.people}</td>
  //       <td>{reservation.status}</td>
  //       <td>{reservation.seat_table}</td>
  //     </tr>
  //   );
  // });

  // const listOfTables = tables.map((table, index) => {
  //   return (
  //     <tr id={table.table_id} key={index}>
  //       <td>{table.table_id}</td>
  //       <td>{table.table_name}</td>
  //       <td>{table.table_capacity}</td>
  //       <td>{table.table_status}</td>
  //     </tr>
  //   );
  // });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ListReservations />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <ListTables />

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
    </main>
  );
}

export default Dashboard;
