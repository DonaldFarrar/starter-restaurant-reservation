import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";

export default function Search() {
  // this state stores the search input
  const [mobileNumber, setMobileNumber] = useState("");
  // this state will store the search results
  const [reservations, SeatReservations] = useState([]);
  // and, this state, well, stores an error if we get one
  const [errors, setErrors] = useState(null);

  const handleChange = ({ target }) => {
    console.log("handle Change");
    setMobileNumber(target.value);
  };

  const handleFindBtn = (event) => {
    console.log("handle find button");
    event.preventDefault();
    const abortController = new AbortController();
    setErrors(null);
    listReservations({mobile_number; mobileNumber}, abortController.signal)
    .then(setReservations)
    .catch(setError);
    return () => abortController.abort();
  };

  return (
    <div>
      <form>
        <label htmlFor="mobile_number">Enter a customer's number:</label>
        <input
          name="mobile_number"
          id="mobile-number"
          type="tel"
          onChange={handleChange}
          value={mobileNumber}
          required
        >
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleFindBtn}
          >
            Find
          </button>
        </input>
      </form>
    </div>
  );
}
