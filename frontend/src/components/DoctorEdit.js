import React, { useState } from 'react';

const DoctorEdit = ({ doctor, updateDoctor }) => {
  const [name, setName] = useState(doctor.name);
  const [specialty, setSpecialty] = useState(doctor.specialty);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDoctor(doctor.id, { name, specialty });
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
        Update Doctor
      </button>
    </form>
  );
};

export default DoctorEdit;
