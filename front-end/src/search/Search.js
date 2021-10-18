import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";
import { listReservations } from "../utils/api";
//import ListReservations from "../dashboard/ListReservations";

export default function Search() {
  // this state stores the search input
  const [mobileNumber, setMobileNumber] = useState("");
  // this state will store the search results
  const [reservations, setReservations] = useState([]);
  // and, this state, well, stores an error if we get one
  const [errors, setErrors] = useState(null);

  const handleChange = ({ target }) => {
    setMobileNumber(target.value);
  };

  const handleFindBtn = (event) => {
    //console.log("mobileNumber", mobileNumber);
    event.preventDefault();
    const abortController = new AbortController();
    setErrors(null);
    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setErrors);
    //console.log("reservations", reservations);
    return () => abortController.abort();
  };

  // function handleCancel() {
  //   if (
  //     window.confirm(
  //       "Do you want to cancel this reservation? This cannot be undone."
  //     )
  //   ) {
  //     const abortController = new AbortController();

  //     updateReservationStatus(
  //       reservations.reservation_id,
  //       "cancelled",
  //       abortController.status
  //     ).then(loadDashboard);

  //     return () => abortController.abort();
  //   }
  // }

  // const searchResults = () => {
  //   // console.log("ERRORS",reservations);
  //   // Used ternary here so we would can return something different if there are no reservations.
  //   console.log(reservations[0]);
  //   return <ListReservations reservation={reservations[0]} />;
  //   // return reservations.length > 0 ? (
  //   //   reservations.map((reservation) => (
  //   //     <ListReservations
  //   //       key={reservation.reservation_id}
  //   //       reservation={reservation}
  //   //     />
  //   //   ))
  //   // ) : (
  //   //   <tr>
  //   //     <td>No Reservation Found</td>
  //   //   </tr>
  //   // );
  // };

  //   console.log("ERROR");

  const listOfReservations = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
        <td>
          <button
            className="btn btn-danger"
            type="button"
            // onClick={handleCancel}
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

  return (
    <div>
      <ErrorAlert errors={errors} />
      <form className="search form">
        <label htmlFor="mobile_number">Enter a customer's number:</label>
        <input
          className="form-control"
          name="mobile_number"
          id="mobile-number"
          type="tel"
          onChange={handleChange}
          value={mobileNumber}
          required
        />
        <button
          type="submit"
          className="btn btn-primary m-1"
          onClick={handleFindBtn}
        >
          Find
        </button>
      </form>
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
