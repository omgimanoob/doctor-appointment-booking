import React from 'react';

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  return (
    <div className="row">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{doctor.name}</h5>
              <p className="card-text">{doctor.specialty}</p>
              <button
                className="btn btn-primary me-2"
                onClick={() => onEdit(doctor)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal${doctor.id}`}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Delete Modal */}
          <div className="modal fade" id={`deleteModal${doctor.id}`} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete {doctor.name||''}?
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={() => onDelete(doctor.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;
