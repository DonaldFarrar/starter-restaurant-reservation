import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ListReservations from "../dashboard/ListReservations";

export default function Search() {
  // this state stores the search input
  const [mobileNumber, setMobileNumber] = useState("");
  // this state will store the search results
  const [reservations, setReservations] = useState([]);
  // and, this state, well, stores an error if we get one
  const [errors, setErrors] = useState(null);

  const handleChange = ({ target }) => {
    //console.log("handle Change");
    setMobileNumber(target.value);
  };

  const handleFindBtn = (event) => {
    //console.log("handle find button");
    event.preventDefault();
    const abortController = new AbortController();
    setErrors(null);
    listReservations({ mobile_number: mobileNumber }, abortController.signal)
      .then(setReservations)
      .catch(setErrors);
    return () => abortController.abort();
  };

  const searchResults = () => {
    // console.log("ERRORS".reservations);
    // Used ternary here so we would can return something different if there are no reservations.
    return reservations.length > 0 ? (
      reservations.map((reservation) => (
        <ListReservations
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    ) : (
      <tr>
        <td>No Reservation Found</td>
      </tr>
    );
  };

  //   console.log("ERROR");

  return (
    <div className="search form">
      <form>
        <ErrorAlert errors={errors} />
        <label htmlFor="mobile_number">Enter a customer's number:</label>
        <input
          className="form-control"
          name="mobile_number"
          id="mobile-number"
          type="tel"
          onChange={handleChange}
          value={mobileNumber}
          required
        >
          <button
            type="submit"
            className="btn btn-primary m-1"
            onClick={handleFindBtn}
          >
            Find
          </button>
        </input>
      </form>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Seat</th>
          </tr>
        </thead>
        <tbody>{searchResults}</tbody>
      </table>
    </div>
  );
}
