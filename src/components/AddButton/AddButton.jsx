import React, { useState } from "react";
import {} from "react";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/UserContext";
import AddModal from "../AddModal/AddModal";
import "./AddButton.css";

export default function AddButtonApp() {
  const [showAddModal, setShowAddModal] = useState(false);
  const toggleShowAddModal = () => setShowAddModal(!showAddModal);
  const { user } = useAuth();

  return (
    <React.Fragment>
      <Button
        id="post_button"
        className="add-button"
        disabled={user ? false : true}
        onClick={toggleShowAddModal}
      >
        Add New Position Listing
      </Button>
      <AddModal show={showAddModal} toggleShow={toggleShowAddModal}></AddModal>
    </React.Fragment>
  );
}
