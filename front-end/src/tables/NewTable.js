import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

export default function NewTable() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ table_name: "", capacity: 1 });

  //if any change happens to the key/values in the formData{useState} this function handles it
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  //submit button for seating a reservation at a table// all fields must meet requirements listed in the validateFields function
  const submitButton = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createTable(formData, abortController.signal)
      .then(history.push("/dashboard"))
      .catch(setError);
    if (validateFields()) {
      history.push(`/dashboard`);
    }
    return () => abortController.abort();
  };

  const validateFields = () => {
    let foundError = null;
    if (formData.table_name === "" || formData.capacity === "") {
      foundError = { message: "All fields must be filled out." };
    } else if (formData.table_name.length < 2) {
      foundError = { message: "Table name has to be 2 characters long." };
    }
    setError(foundError);
    return !foundError;
  };

  return (
    <div className="d-md-flex mb-3">
      <form>
        <ErrorAlert error={error} />
        <label htmlFor="table_name">&nbsp;Table Name:&nbsp;</label>
        <input
          name="table_name"
          id="table_name"
          type="text"
          minLength="2"
          defaultValue={formData.table_name}
          onChange={changeHandler}
          required
        ></input>
        <label htmlFor="capacity">&nbsp;Capacity:&nbsp;</label>
        <input
          name="capacity"
          id="capacity"
          type="number"
          min="1"
          defaultValue={formData.capacity}
          onChange={changeHandler}
          required
        ></input>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={history.goBack}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitButton}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
