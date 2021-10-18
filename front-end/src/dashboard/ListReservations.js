import React from "react";
import { updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link, useHistory } from "react-router-dom";
import formatReservationDate from "../utils/format-reservation-date";

export default function ListReservations({
  reservations,
  reservationsError,
  loadDashboard,
}) {
  const history = useHistory();
  // useEffect(loadDashboard, [loadDashboard]);

  // if (!reservations || reservations.status === "finished") return null;

  function handleCancel(reservation) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();

      updateReservationStatus(
        reservation.reservation_id,
        "cancelled",
        abortController.status
      ).then((data) => {
        const date = formatReservationDate(reservation)
        console.log("date", date)
        history.push(
          `/reservations?date=${date}`
        );
        loadDashboard(data);
      });

      return () => abortController.abort();
    }
  }

  const listOfReservations = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
        <td>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleCancel(reservation)}
            data-reservation-id-cancel={reservation.reservation_id}
          >
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
          <a href={`/reservations/${reservation.reservation_id}/edit`}>
            <button type="button" className="btn btn-success px-4">
              Edit
            </button>
          </a>
        </td>
      </tr>
    );
  });
  console.log("reservations", reservations);
  return (
    <>
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
            <th className="border-top-0"></th>
            <th className="border-top-0"></th>
          </tr>
        </thead>
        <tbody>{listOfReservations}</tbody>
      </table>
    </>
  );
}
