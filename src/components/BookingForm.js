// BookingForm.js
import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Import Supabase client

const BookingForm = ({ selectedDate, addBooking }) => {
  const [time, setTime] = useState('');
  const [car, setCar] = useState('');
  const [reason, setReason] = useState('');
  const [person, setPerson] = useState('Zain');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add booking to Supabase
    const { error } = await supabase
      .from('bookings')
      .insert([{ date: selectedDate, time, car, reason, person }]);

    if (error) {
      console.error('Error adding booking:', error);
    } else {
      addBooking({ id: Date.now(), date: selectedDate, time, car, reason, person }); // Local state update
      setTime('');
      setCar('');
      setReason('');
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Add Booking for {selectedDate}</h2>

      <div className="form-group">
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Car:</label>
        <div className="radio-group">
          <label>
            <input type="radio" value="Corolla" checked={car === 'Corolla'} onChange={(e) => setCar(e.target.value)} required /> Corolla
          </label>
          <label>
            <input type="radio" value="Vitz" checked={car === 'Vitz'} onChange={(e) => setCar(e.target.value)} required /> Vitz
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Person:</label>
        <select value={person} onChange={(e) => setPerson(e.target.value)} required>
          <option value="">Select Person</option>
          <option value="Asher">Asher</option>
          <option value="Shumaila">Shumaila</option>
          <option value="Zain">Zain</option>
          <option value="Maira">Maira</option>
        </select>
      </div>

      <div className="form-group">
        <label>Reason:</label>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} required />
      </div>

      <button type="submit">Add Booking</button>
    </form>
  );
};

export default BookingForm;
