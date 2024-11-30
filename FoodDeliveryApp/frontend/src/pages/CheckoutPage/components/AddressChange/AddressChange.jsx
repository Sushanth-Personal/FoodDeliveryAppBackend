import { useState } from "react";
import styles from "./addresschange.module.css";
import {useUserContext} from "../../../../Contexts/UserContext";
const AddressChange = () => {
  const {setIsAddressChangeClicked} = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);

  const [formData, setFormData] = useState({
    state: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
    fullAddress: "",
  });

  const [editIndex, setEditIndex] = useState(null); // Track which address is being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // Update the existing address
      setAddresses((prev) =>
        prev.map((address, index) =>
          index === editIndex ? formData : address
        )
      );
    } else {
      // Add a new address
      setAddresses((prev) => [...prev, formData]);
    }

    // Reset form and modal
    setFormData({
      state: "",
      city: "",
      pinCode: "",
      phoneNumber: "",
      fullAddress: "",
    });
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(addresses[index]); // Load the address into the form for editing
    setShowModal(true);
  };

  const handleRemove = (index) => {
    if (defaultAddressIndex === index) {
      setDefaultAddressIndex(null); // Reset default if the default address is removed
    }
    setAddresses((prev) => prev.filter((_, i) => i !== index)); // Remove the selected address
  };

  const handleSetDefault = (index) => {
    setDefaultAddressIndex(index);
  };

  return (
    <section className={styles.addressChange}>
      <div className={styles.header}>
        <img
        
          role="button"
          onClick={() =>setIsAddressChangeClicked(false)}
          src="/backarrow.png"
          alt="backarrow"
        />
        <h1>Your Addresses</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.addAddress} onClick={() => setShowModal(true)}>
          <img src="/addAddress.png" alt="addaddress" />
        </div>

        {addresses.map((address, index) => (
          <div
            key={index}
            className={`${styles.address} ${
              index === defaultAddressIndex ? styles.defaultAddress : ""
            }`}
            onClick={() => handleSetDefault(index)}
          >
            <span>
              <h1>New Address</h1>
              {index === defaultAddressIndex && (
                <div className={styles.default}>Default</div>
              )}
            </span>
            <address>
              {address.fullAddress}
              <br />
              {address.city}, {address.state}, {address.pinCode}
              <br />
              Phone Number: {address.phoneNumber}
            </address>
            <div className={styles.editContainer}>
              <button
                className={styles.edit}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent setting default when editing
                  handleEdit(index);
                }}
              >
                Edit
              </button>
              <button
                className={styles.remove}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent setting default when removing
                  handleRemove(index);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className = {styles.heading}>
                <img
                className = {styles.locationMarker}
                src="/locationMarker.png" alt="locationmarker" />
                <h2>{editIndex !== null ? "Edit Address" : "Add Address"}</h2>
              </div>
              <div className={styles.modalContent}>
                <div className = {styles.inputContainer}>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City/District"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="Pin Code"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <textarea
                  name="fullAddress"
                  placeholder="Full Address"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                />
                <div className={styles.modalButton}>
                  <button onClick={handleSave}>Save</button>
                
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddressChange;
