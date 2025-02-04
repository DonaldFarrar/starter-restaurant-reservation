import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {
  createReservation,
  readReservation,
  editReservation,
} from "../utils/api";
import formatPhoneNumber from "../utils/format-reservation-mobile-number";

export default function NewReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  //useState hook to implement change on reservation information
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });
  //new state that contains errors
  //if no errors are found it will remain an empty array
  const [errorsArray, setErrorsArray] = useState([]);

  function findReservation() {
    if (reservation_id) {
      const abortController = new AbortController();
      readReservation(reservation_id, abortController.signal)
        .then((data) => {
          data.reservation_date = data.reservation_date.substring(
            0,
            data.reservation_date.indexOf("T")
          );

          setFormData(data);
        })
        .catch(setErrorsArray);
      return () => abortController.abort();
    }
  }

  useEffect(findReservation, [reservation_id]);

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
    console.log("target.value", target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    //variable with an empty array to hold all of the errors made if someone tries to book for Tuesday
    const foundErrors = [];
    // if there are errors, we don't want to push the user onto a different page, we want them to stay on this page until the issue is resolved.

    if (validateDate(foundErrors) && validateFields(foundErrors)) {
      if (reservation_id) {
        await editReservation(
          reservation_id,
          {
            ...formData,
            people: parseInt(formData.people),
            mobile_number: formatPhoneNumber(formData.mobile_number),
          },
          abortController.signal
        )
          .then(() =>
            history.push(`/dashboard?date=${formData.reservation_date}`)
          )
          .catch((error) => foundErrors.push(error));
      } else {
        await createReservation(formData, abortController.signal)
          .then(() =>
            history.push(`/dashboard?date=${formData.reservation_date}`)
          )
          .catch((error) => foundErrors.push(error));
      }
    }
    setErrorsArray(foundErrors);
    //use foundErrors array to see if there is any problems
  }

  function validateFields(foundErrors) {
    for (const field in formData) {
      //looped through the formData and if any of them are blank the message below will show

      if (formData[field] === "") {
        foundErrors.push({
          message: `${field.split("_").join(" ")} cannot be left blank`,
        });
      }
      if (formData.people <= 0) {
        foundErrors.push({ message: "Party must be a size of at least 1." });
      }
    }
    return foundErrors.length === 0;
  }

  function validateDate(foundErrors) {
    //constructor has the date and time included
    const reserveDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    //comparing the reservation to todays date
    const todaysDate = new Date();

    //checking the condition to see if the person is booking for Tuesday
    if (reserveDate.getDay() === 2) {
      //The restaurant is closed Tuesday, so any reservations made for that day will present an error
      foundErrors.push({
        message:
          "Reservations cannot be made on a Tuesday (Restaurant is closed).",
      });
    }
    if (reserveDate < todaysDate) {
      foundErrors.push({
        message: "Reservation cannot be made: Date is in the past.",
      });
    }
    // Below we are checking the time the person is trying to book a reservation, if they book outside the restaurant hours or 1 hour before they close a error message with pop up
    if (
      reserveDate.getHours() < 10 ||
      (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    } else if (
      reserveDate.getHours() > 22 ||
      (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message: "Reservation cannot be made: Restaurant closes at 10:30PM.",
      });
    } else if (
      reserveDate.getHours() > 21 ||
      (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });
    }
    return foundErrors.length === 0;
  }

  const errors = () => {
    return errorsArray.map((error, index) => (
      <ErrorAlert key={index} error={error} />
    ));
  };
  //put errors right at the top of the customer ingformation form so the user will notice it

  return (
    <main>
      <div className="header">
        <div className="header-text">
          <div className="header">
            <h1>Create a new reservation</h1>
          </div>
          <div className="d-md-flex mb-3">
            <form>
              <fieldset>
                <legend>Customer Information:</legend>
                <div className="name_info">
                  <div className="form-group">
                    {errors()}
                    <label htmlFor="first_name">First Name:&nbsp;</label>
                    <input
                      name="first_name"
                      id="first_name"
                      type="text"
                      title="Enter your first name"
                      placeholder="Enter your first name"
                      className="form-control"
                      onChange={handleChange} //the function we just made! the onChange attribute will automatically pass the `event` argument based off of which input was clicked
                      value={formData.first_name} //we can use our useState hook to store the values of each input now
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name:&nbsp;</label>
                    <input
                      name="last_name"
                      id="last_name"
                      type="text"
                      title="Enter your last name"
                      placeholder="Enter your last name"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.last_name}
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number:&nbsp;</label>
                    <input
                      name="mobile_number"
                      id="mobile_number"
                      type="tel"
                      title="Enter your mobile phone number"
                      placeholder="Enter your mobile phone number"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.mobile_number}
                      required
                    ></input>
                  </div>
                </div>
                <div className="party_info">
                  <div className="form-group">
                    <label htmlFor="reservation_date">
                      Reservation Date:&nbsp;
                    </label>
                    <input
                      name="reservation_date"
                      id="reservation_date"
                      type="date"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.reservation_date}
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="reservation_time">
                      Reservation Time:&nbsp;
                    </label>
                    <input
                      name="reservation_time"
                      id="reservation_time"
                      type="time"
                      className="form-control"
                      onChange={handleChange}
                      value={formData.reservation_time}
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="people">Party Size:&nbsp;</label>
                    <input
                      name="people"
                      id="people"
                      type="text"
                      title="Total number of your party"
                      className="form-control"
                      placeholder="Number of guest in the party"
                      onChange={handleChange}
                      value={formData.people}
                      required
                    ></input>
                  </div>
                </div>
              </fieldset>
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn btn-secondary m-3"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary m-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
