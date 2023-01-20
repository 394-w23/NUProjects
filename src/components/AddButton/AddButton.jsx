import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddModal from '../AddModal/AddModal';
import "./AddButton.css";
import { useAuthState } from '../../utilities/firebase';

export default function AddButtonApp() {
    const [showAddModal, setShowAddModal] = useState(false);
    const toggleShowAddModal = () => setShowAddModal(!showAddModal);

    
    return (
        <>
          <Button className="add-button" onClick={toggleShowAddModal}>Add New Position Listing</Button>
          <AddModal show={showAddModal} toggleShow={toggleShowAddModal}></AddModal>
        </>
    );
}