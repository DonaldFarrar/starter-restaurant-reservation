export default function formatPhoneNumber(phoneNumberString) {
  return parseInt(phoneNumberString.replace(/[^0-9]/g, ""), 10);
}

/**
 * Formats the reservation_date property of a reservation.
 * @param reservations
 *  a single reservation, or an array of reservations.
 * @returns {[reservation]|reservation}
 *  the specified reservation(s) with the reservation_date property formatted as YYYY-MM-DD.
 */
