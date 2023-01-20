import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddModal from '../AddModal/AddModal';
import "./AddButton.css";
import { useAuthState } from '../../utilities/firebase';

export default function AddButtonApp() {
    const [showAddModal, setShowAddModal] = useState(false);
    const toggleShowAddModal = () => setShowAddModal(!showAddModal);
    const [user] = useAuthState();
    console.log("user is logged in")
    useEffect(() => {
        if (user) {
          
          document.querySelector("#post_button").disabled = false;
        } else {
          document.querySelector("#post_button").disabled = true;
        }
    }, [user]);
    
    return (
        <>
          <Button id="post_button" className="add-button" onClick={toggleShowAddModal}>Add New Position Listing</Button>
          <AddModal show={showAddModal} toggleShow={toggleShowAddModal}></AddModal>
        </>
    );
}