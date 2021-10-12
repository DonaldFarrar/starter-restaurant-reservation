import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function ListTables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const listOfTables = tables.map((table, index) => {
    return (
      <tr id={table.table_id} key={index}>
        <td>{table.table_id}</td>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.status}</td>
      </tr>
    );
  });

  return (
    <div>
      <ErrorAlert error={tablesError} />
      <div className="d-md-flex mb-3">
        <table className="table no-wrap">
          <thead>
            <tr>
              <th className="border-top-0">ID</th>
              <th className="border-top-0">Table Name</th>
              <th className="border-top-0">Capacity</th>
              <th className="border-top-0">Status</th>
            </tr>
          </thead>
          <tbody>{listOfTables}</tbody>
        </table>
      </div>
    </div>
  );
}
