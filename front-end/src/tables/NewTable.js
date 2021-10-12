import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
  const history = useHistory();
  const [error, serError] = useState([]);
  const [formData, setFormData] = useState({ table_name: "", capacity: 1 });

  return (
    <form>
      <ErrorAlert error={error} />
      <label htmlFor="table_name">Table Name:&nbsp;</label>
      <input
        name="table_name"
        id="table_name"
        type="text"
        minLength="2"
      ></input>
      <label htmlFor="capacity">Capacity:&nbsp;</label>
      <input name="capacity" id="capacity" type="number" min="1"></input>
      <button type="submit" onClick={}>Submit</button>
      <button type="button" onClick={}>Cancel</button>
    </form>
  );
}
