import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations, seatTable } from "../utils/api";
import ListReservations from "../dashboard/ListReservations";
import ListTables from "../dashboard/ListTables";

export default function SeatReservations({ tables }) {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [table_id, setTableId] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(null, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }, []);

  if (!tables || !reservations) return null;

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (validateSeat()) {
      seatTable(reservation_id, table_id, abortController.signal)
        .then(setReservations)
        .then(() => history.push(`/dashboard`))
        .catch(setApiError);
    }

    return () => abortController.abort();
  };

  function validateSeat() {
    const foundErrors = [];

    const foundTable = tables.find(
      (table) => table.table_id === Number(table_id)
    );
    const foundReservation = reservations.find(
      (reservation) => reservation.reservation_id === reservation_id
    );

    if (!foundTable) {
      foundErrors.push("The table you selected does not exist.");
    } else if (!foundReservation) {
      foundErrors.push("This reservation does not exist.");
    } else {
      if (foundTable.status === "occupied") {
        foundErrors.push("The table you selected is currently occupied.");
      }

      if (foundTable.capacity < foundReservation.people) {
        foundErrors.push(
          `The table you selected cannot seat ${foundReservation.people} people.`
        );
      }
    }
    setErrors(foundErrors);
    return foundErrors.length === 0;
  }

  const tableOptions = () => {
    return tables.map((table) => (
      <option value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    ));
  };

  const errorsJSX = () => {
    return errors.map((error, index) => (
      <ErrorAlert key={index} error={error} />
    ));
  };
  return (
    <>
      <form>
        {errorsJSX()}
        <ErrorAlert error={apiError} />
        <ErrorAlert error={setReservationsError} />
        <label htmlFor="table_id">Choose table:</label>
        <select
          name="table_id"
          id="table_id"
          value={table_id}
          onChange={handleChange}
        >
          {tableOptions()}
        </select>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={history.goBack}>
          Cancel
        </button>
      </form>
      <div className="d-md-flex mb-3">
        <ErrorAlert error={errors} />
        <h4 className="mb-0">Seat Reservations</h4>
        <ListReservations
          reservations={reservations}
          setReservations={setReservations}
          setReservationsError={setReservationsError}
        />
        <ListTables tables={tables} />
      </div>
    </>
  );
}
