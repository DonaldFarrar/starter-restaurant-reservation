import React, { useState, useEffect } from "react";

export default function ListTables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // useEffect(loadTables, []);

  //   function loadTables() {
  //     const abortController = new AbortController();
  //     setTablesError(null);
  //     listTables(abortController.signal).then(setTables).catch(setTablesError);
  //     return () => abortController.abort();
  //   }

  const listOfTables = tables.map((table, index) => {
    return (
      <tr id={table.table_id} key={index}>
        <td>{table.table_id}</td>
        <td>{table.table_name}</td>
        <td>{table.table_capacity}</td>
        <td>{table.table_status}</td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      <table className="table no-wrap">
        <thead>
          <tr>
            <th className="border-top-0">ID</th>
            <th className="border-top-0">Table Name</th>
            <th className="border-top-0">Capacity</th>
            <th className="border-top-0">Status</th>
          </tr>
        </thead>
        {listOfTables}
      </table>
    </div>
  );
}
