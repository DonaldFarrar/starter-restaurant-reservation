import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, seatTable, listTables } from "../utils/api";

export default function SeatReservations() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [table_id, setTableId] = useState(0);
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState(null);

  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setErrors(null);
    listTables(abortController.signal).then(setTables).catch(setErrors);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController();
    setErrors(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setErrors);
    return () => abortController.abort();
  }, [reservation_id]);

  if (!tables || !reservation) return null;

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (validateSeat()) {
      seatTable(reservation_id, table_id, abortController.signal)
        //.then(loadDashboard)
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
    // const foundReservation = reservations.find(
    //   (reservation) => reservation.reservation_id === Number(reservation_id)
    // );
    if (!foundTable) {
      foundErrors.push("The table you selected does not exist.");
    } else if (!reservation) {
      foundErrors.push({ message: "This reservation does not exist." });
    } else {
      if (foundTable.reservation_id) {
        foundErrors.push({
          message: "The table you selected is currently occupied.",
        });
      }

      if (foundTable.capacity < reservation.people) {
        foundErrors.push({
          message: `The table you selected cannot seat ${reservation.people} people.`,
        });
      }
    }
    setErrors(foundErrors);
    return foundErrors.length === 0;
  }

  const tableOptions = () => {
    return tables.map((table) => (
      <option key={table.table_id} value={table.table_id}>
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
      <form className="form-select">
        {errorsJSX()}
        <ErrorAlert error={apiError} />
        {/* <ErrorAlert error={setReservationError} /> */}
        <label className="form-label" htmlFor="table_id">
          Choose table or bar seating:
        </label>
        <select
          className="form-control m-1"
          name="table_id"
          id="table_id"
          value={table_id}
          onChange={handleChange}
        >
          <option value={0}>Select</option>
          {tableOptions()}
        </select>

        <button
          type="submit"
          className="btn btn-primary px-4 m-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary px-4 m-2"
          onClick={history.goBack}
        >
          Cancel
        </button>
      </form>
      <div className="d-md-flex mb-3"></div>
    </>
  );
}
