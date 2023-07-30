import React, { useState, useEffect } from 'react';
import DoctorForm from './components/DoctorForm';
import DoctorList from './components/DoctorList';
import DoctorEdit from './components/DoctorEdit';
import DoctorDelete from './components/DoctorDelete';

function App() {
  const [editDoctor, setEditDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const apibase = "http://localhost:3000/api/doctors";

  useEffect(() => {
    // Fetch the list of doctors from the backend
    const fetchDoctors = async () => {
      try {
        const response = await fetch(apibase);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const addDoctor = async (doctorData) => {
    console.log('adding doctor...');
    try {
      const response = await fetch(apibase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });
      const data = await response.json();
      console.log('New doctor added:', data);
      setDoctors([...doctors, data]);
      setShowAddModal(false); // Close the Add Doctor modal
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const updateDoctor = async (id, doctorData) => {
    console.log('updating doctor', id);
    try {
      const response = await fetch(`${apibase}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });
      const data = await response.json();
      console.log('Doctor updated:', data);
      setEditDoctor(null);
      // Update the local state with the updated doctor data
      setDoctors(doctors.map((doctor) => (doctor.id === id ? data : doctor)));
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const deleteDoctor = async (id) => {
    console.log('Deleting doctor with ID:', id);
    try {
      const response = await fetch(`${apibase}/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Doctor deleted:', data);
      setEditDoctor(null);
      // Remove the deleted doctor from the local state
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      setShowDeleteModal(false); // Close the Confirm Delete modal
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Doctor Appointment Booking</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="col mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">Specialty: {doctor.specialty}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditDoctor(doctor)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#confirmDeleteModal"
                    onClick={() => setEditDoctor(doctor)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#addDoctorModal"
          onClick={() => setShowAddModal(true)}
        >
          Add Doctor
        </button>
      </div>

      {editDoctor && (
        <>
          {/* <DoctorEdit doctor={editDoctor} updateDoctor={updateDoctor} />
          <DoctorDelete doctor={editDoctor} deleteDoctor={deleteDoctor} /> */}
        </>
      )}

      {/* Add Doctor Modal */}
      <div
        className="modal fade"
        id="addDoctorModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addDoctorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDoctorModalLabel">
                Add Doctor
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DoctorForm addDoctor={addDoctor} />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this doctor?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteDoctor(editDoctor.id);
                  // Close the modal after deletion
                  document.getElementById('confirmDeleteModal').click();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
