import React from 'react';

const DoctorDelete = ({ doctor, onDelete }) => {
  return (
    <div className="modal fade" id={`deleteModal${doctor.id}`} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete {doctor.name}?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" onClick={() => onDelete(doctor.id)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDelete;
