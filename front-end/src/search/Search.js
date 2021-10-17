import React, { useState } from "react";

export default function Search() {
  // this state stores the search input
  const [mobileNumber, setMobileNumber] = useState("");
  // this state will store the search results
  const [reservations, SeatReservations] = useState([]);
  // and, this state, well, stores an error if we get one
  const [errors, seetErrors] = useState(null);

  const handleChange = ({ target }) => {
    console.log("handle Change");
    setMobileNumber(target.value);
  };

  const handleFindBtn = (event) => {
    console.log("handle find button");
    event.preventDefault();
    

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
