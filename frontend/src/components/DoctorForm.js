import React, { useState } from 'react';

const DoctorForm = ({ addDoctor }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor({ name, specialty });
    setName('');
    setSpecialty('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="specialty" className="form-label">
          Specialty:
        </label>
        <input
          type="text"
          className="form-control"
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Doctor
      </button>
    </form>
  );
};

export default DoctorForm;
