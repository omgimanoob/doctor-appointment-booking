// components/DoctorCard.js

import React from 'react';
import { Button, Card } from 'react-bootstrap';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{doctor.name}</Card.Title>
        <Card.Text>Specialty: {doctor.specialty}</Card.Text>
        <Button variant="primary" onClick={() => onEdit(doctor)}>
          Edit
        </Button>{' '}
        <Button variant="danger" onClick={() => onDelete(doctor.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
