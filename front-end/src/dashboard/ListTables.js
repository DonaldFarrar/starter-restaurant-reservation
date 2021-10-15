import React, { useState, useEffect } from "react";
import { listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
//import { useHistory } from "react-router";

export default function ListTables() {
  //const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // window.confirm will show a dialogue that willl give an OK button or Cancel button
  const handleFinish = (table_id) => {
    //console.log("table_id", table_id);
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      //need to add a delete request
      const abortController = new AbortController();
      finishTable(table_id, abortController.signal)
        .then(loadTables)
        //.then(history.go(0))
        .catch(setTablesError);

      return () => abortController.abort();
    }
  };

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
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? "occupied" : "free"}
        </td>
        <td data-table-id-finish={table.table_id}>
          {table.reservation_id && (
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={() => {
                handleFinish(table.table_id);
              }}
            >
              Finish
            </button>
          )}
        </td>
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
