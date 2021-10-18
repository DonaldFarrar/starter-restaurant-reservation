import React from "react";
import ListReservations from "../dashboard/ListReservations";
import NewReservation from "./NewReservation";

export default function Edit() {
  return (
    <div>
      <h1>Edit a reservation</h1>
      <NewReservation />
      <ListReservations />
    </div>
  );
}
