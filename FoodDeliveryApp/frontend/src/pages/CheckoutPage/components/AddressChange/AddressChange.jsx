import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import styles from "./addresschange.module.css";
import { useUserContext } from "../../../../Contexts/UserContext";
import useImage from "../../../../customHook/useImage";
import { displayImage } from "../../../../utility/imageProcess";
import useScreenSize from "../../../../customHook/useScreenSize";
import useAuth from "../../../../customHook/useAuth";

const AddressChange = () => {
  useAuth();
  const baseURL = "http://localhost:5000";
  const imageURLs = useImage("page", "addresschange");
  const { setIsAddressChangeClicked, userId } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);
  const isMobile = useScreenSize(768);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
    fullAddress: "",
    isDefault: false,
  });

  const [editIndex, setEditIndex] = useState(null); // Track which address is being edited

  useEffect(() => {
    // Fetch addresses when component mounts or userId changes
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get(`${baseURL}/address/${userId}`);
      setAddresses(response.data);
      
      // Check if any address has isDefault set to true
      const defaultAddress = response.data.find((address) => address.isDefault);
      if (defaultAddress) {
        setDefaultAddressIndex(response.data.indexOf(defaultAddress)); // Set the default address index
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editIndex !== null) {
      // Update the existing address
      try {
        const updatedData = { ...formData, isDefault: defaultAddressIndex === editIndex };
        const response = await axios.put(`${baseURL}/address/${userId}/${addresses[editIndex]._id}`, updatedData);
        const updatedAddresses = addresses.map((address, index) =>
          index === editIndex ? response.data : address
        );
        setAddresses(updatedAddresses);
      } catch (error) {
        console.error("Error updating address:", error);
      }
    } else {
      // Add a new address
      try {
        const updatedData = { ...formData, isDefault: defaultAddressIndex === addresses.length }; // Set as default if it's the first address
        const response = await axios.post(`${baseURL}/address/${userId}`, updatedData);
        setAddresses((prev) => [...prev, response.data]);
      } catch (error) {
        console.error("Error adding address:", error);
      }
    }

    // Reset form and modal
    setFormData({
      state: "",
      city: "",
      pinCode: "",
      phoneNumber: "",
      fullAddress: "",
      isDefault: false,
    });
    setEditIndex(null);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(addresses[index]); // Load the address into the form for editing
    setShowModal(true);
  };

  const handleRemove = async (index) => {
    if (defaultAddressIndex === index) {
      setDefaultAddressIndex(null); // Reset default if the default address is removed
    }

    try {
      await axios.delete(`${baseURL}/address/${userId}/${addresses[index]._id}`);
      setAddresses((prev) => prev.filter((_, i) => i !== index)); // Remove the selected address
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  const handleSetDefault = async (index) => {
    // Set the selected address as default and trigger save
    setDefaultAddressIndex(index);

    // Prepare the updated data with the default address flag
    const updatedData = {
      ...addresses[index],
      isDefault: true,
    };

    try {
      // Update the existing address to set it as default
      const response = await axios.put(
        `${baseURL}/address/${userId}/${addresses[index]._id}`,
        updatedData
      );

      // Update the addresses state with the new default address
      const updatedAddresses = addresses.map((address, idx) =>
        idx === index ? response.data : address
      );
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <section className={styles.addressChange}>
      <div className={styles.header}>
      <>
          {!isMobile ? (
            <img
              id="addresschange-header-backarrow-1"
              role="button"
              onClick={() => setIsAddressChangeClicked(false)}
              src={displayImage(imageURLs, "addresschange-header-backarrow-1")}
              alt="backarrow"
            />
          ) : (
            <img
              id="addresschange-header-colorback-1"
              role="button"
              onClick={() => setIsAddressChangeClicked(false)}
              src={displayImage(imageURLs, "addresschange-header-colorback-1")}
              alt="colorback"
            />
          )}
        </>
        <h1>Your Addresses</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.addAddress} onClick={() => setShowModal(true)}>
        <>
            {!isMobile ? (
              <img
                id="addresschange-addaddress-addaddress-1"
                src={displayImage(imageURLs, "addresschange-addaddress-addaddress-1")}
                alt="addaddress"
              />
            ) : (
              <img
                id="addresschange-addaddress-addaddressmobile-1"
                src={displayImage(imageURLs, "addresschange-addaddress-addaddressmobile-1")}
                alt="addaddressmobile"
              />
            )}
          </>
        </div>

        {addresses.map((address, index) => (
          <div
            key={index}
            className={`${styles.address} ${index === defaultAddressIndex ? styles.defaultAddress : ""}`}
            onClick={() => handleSetDefault(index)}
          >
            <div className={styles.topContent}>
              <span>
                <h1>New Address</h1>
                {index === defaultAddressIndex && <div className={styles.default}>Default</div>}
              </span>
              <address>
                {address.fullAddress}
                <br />
                {address.city}, {address.state}, {address.pinCode}
                <br />
                Phone Number: {address.phoneNumber}
              </address>
            </div>
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
              <img
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
                src={displayImage(imageURLs, "addresschange-overlay-cancelbutton-1")}
                alt="cancelbutton"
              />
              <div className={styles.heading}>
                <h2>{editIndex !== null ? "Edit Address" : "Add Address"}</h2>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.inputContainer}>
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
