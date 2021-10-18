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

  const SearchResults = () => {
    return reservations.length > 0 ? (
      <ListReservations reservations={reservations} />
    ) : (
      <div>
        <h1>No reservations found</h1>
      </div>
    );
  };

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
      <SearchResults />
    </div>
  );
}
