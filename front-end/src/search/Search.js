import React, { useState } from "react";

export default function Search() {
  const [mobileNumber, setMobileNumber] = useState(null);

  const handleChange = () => {
    console.log("handle Change");
  };

  const handleFindBtn = () => {
      console.log("handle find button")
  }

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
          <button type="submit" onClick={handleFindBtn}>
            Find
          </button>
        </input>
      </form>
    </div>
  );
}
