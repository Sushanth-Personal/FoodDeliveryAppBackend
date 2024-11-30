import { useState, useEffect } from "react";
import styles from "./profilepage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useUserContext } from "../../contexts/UserContext";
import { editUserData, checkAuthentication } from "../../api/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../customHook/useAuth";
const ProfilePage = () => {
  useAuth();

  const { userData, setUserData, userId, setUserId } =
    useUserContext(); // Assuming these are provided by the context
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated and set userId from localStorage
    checkAuthentication().then((response) => {
      if (!response) {
        navigate("/login"); // Redirect to login if not authenticated
      } else {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId); // Set userId from localStorage
      }
    });
  }, [navigate, setUserId]); // Added dependencies for useEffect

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        // Update userData with userId
        const updatedUserData = { ...userData, userId };

        // Save to backend
        const response = await editUserData(updatedUserData);
        console.log("Saved successfully:", response.data);

        // Optionally update state with the updated data
        setUserData(updatedUserData);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
    setIsEditing(!isEditing); // Toggle the editing state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className={styles.profilePage}>
      <div className={styles.headerDesktopContainer}>
        <HeaderDesktop />
      </div>
      <div className={styles.navBarContainer}>
        <NavBar />
      </div>

      <section className={styles.userProfile}>
        <header>
          <img
            role="button"
            onClick={() => window.history.back()}
            src="/backarrow.png"
            alt="backarrow"
          />
          <h1>My Profile</h1>
        </header>
        <div className={styles.userHeading}>
          <div>
            <img src="/userphoto.png" alt="userphoto" />
            <h1>{userData.userName || "John Doe"}</h1>
          </div>
          <button onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        <div className={styles.row}>
          <div className={styles.userDetailsContainer}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.userName || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.userDetailsContainer}>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              value={userData.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.userDetailsContainer}>
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              name="gender"
              value={userData.gender || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.userDetailsContainer}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              value={userData.country || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </section>

      <section className={styles.paymentMethods}>
        <header>Saved Payment Methods</header>
        <div className={styles.paymentMethodsContainer}>
          <div className={styles.paymentMethod}>
            <div>
              <img src="/cardicon.png" alt="cardicon" />
              <h1>
                xxxx xxxx xxxx 1234
                <p>{userData.name || "John Doe"}</p>
              </h1>
            </div>
            <img src="/editicon.png" alt="editicon" />
          </div>
          <div className={styles.addCard}>
            <img src="/add.png" alt="addcard" />
            <h1>Add New Card</h1>
          </div>
        </div>
      </section>

      <div className={styles.footerContainer}>
        <FooterComponent />
      </div>
    </section>
  );
};

export default ProfilePage;
