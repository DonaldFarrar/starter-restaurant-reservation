import React, { useEffect } from "react";
//import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

export default function ListReservations({
  reservations,
  reservationsError,
  loadDashboard,
}) {
  useEffect(loadDashboard, [loadDashboard]);

  const listOfReservations = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
        <td>
          <button type="button" className="btn btn-danger px-4">
            Cancel
          </button>
        </td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td>
          {reservation.status === "booked" && (
            <Link
              to={`/reservations/${reservation.reservation_id}/seat`}
              type="button"
              className="btn btn-primary px-4"
            >
              Seat
            </Link>
          )}
        </td>
        <td>
          <button type="button" className="btn btn-success px-4">
            Edit
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <ErrorAlert error={reservationsError} />
      <table className="table no-wrap">
        <thead>
          <tr>
            <th className="border-top-0"></th>
            <th className="border-top-0">First Name</th>
            <th className="border-top-0">Last Name</th>
            <th className="border-top-0">Mobile Number</th>
            <th className="border-top-0">Reservation Date</th>
            <th className="border-top-0">Reservation Time</th>
            <th className="border-top-0">People</th>
            <th className="border-top-0">Status</th>
            <th className="border-top-0">Seat Table</th>
            <th className="border-top-0"></th>
            <th className="border-top-0"></th>
          </tr>
        </thead>
        <tbody>{listOfReservations}</tbody>
      </table>
    </div>
  );
}
