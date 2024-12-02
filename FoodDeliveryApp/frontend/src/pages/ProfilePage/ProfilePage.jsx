import { useState, useEffect } from "react";
import styles from "./profilepage.module.css";
import HeaderDesktop from "../../components/HeaderDesktop/HeaderDesktop";
import NavBar from "../../components/NavBar/NavBar";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { useUserContext } from "../../contexts/UserContext";
import { editUserData } from "../../api/api";
import { getCards, addCards, deleteCard } from "../../api/api"; // Import API functions
import { useNavigate } from "react-router-dom";
import useAuth from "../../customHook/useAuth";
import useImage from "../../customHook/useImage";
import { displayImage } from "../../utility/imageProcess";
import useScreenSize from "../../customHook/useScreenSize";
const ProfilePage = () => {
  useAuth();
  const navigate = useNavigate();
  const { userData, setUserData, userId, setUserId } =
    useUserContext(); // Assuming these are provided by the context
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState([]); // State to store saved cards
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const isTablet = useScreenSize(1080);
  const isMobile = useScreenSize(768);
  const isSmallDevice = useScreenSize(500);
  const navURLs = useImage("page", "navbar");
  const imageURLs = useImage("page", "profilepage");

  useEffect(() => {
    let id = userId;
    if (!id) {
      id = localStorage.getItem("userId");
      setUserId(id);
      if (!id) {
        navigate("/login");
      }
    }
    fetchCards(id);
  }, []);

  // Fetch cards from the backend
  const fetchCards = async (userId) => {
    try {
      console.log("userId", userId);
      const fetchedCards = await getCards(userId);
      setCards(fetchedCards || []);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  // Save card to backend
  const handleSaveCard = async () => {
    try {
      // Add the card to the backend
      const savedCard = await addCards(currentCard, userId);
      console.log("savedCard", savedCard);
      // Update the state with the new card
      setCards((prevCards) => [...prevCards, savedCard]);

      // Reset modal state
      setCurrentCard({
        cardNumber: "",
        expiry: "",
        cvv: "",
        nameOnCard: "",
      });
      setIsModalOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleDeleteCard = async (card) => {
    try {
      const response = await deleteCard(userId, card._id);
      if (response) {
        setCurrentCard({
          cardNumber: "",
          expiry: "",
          cvv: "",
          nameOnCard: "",
        });
      }
      setIsModalOpen(false);
      fetchCards(userId);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const updatedUserData = { ...userData, userId };
        const response = await editUserData(updatedUserData);
        console.log("Saved successfully:", response.data);
        setUserData(updatedUserData);
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setCurrentCard({
      cardNumber: "",
      expiry: "",
      cvv: "",
      nameOnCard: "",
    });
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleCardEdit = (card) => {
    setIsEditing(true);
    setCurrentCard(card);
    setIsModalOpen(true);
  };

  return (
    <section className={styles.profilePage}>
      {(isTablet) && (
        <div className={styles.firstRow}>
          <div className={styles.logo}>
            <img
              src={displayImage(navURLs, "navbar-logo-logo-1")}
              className={styles.logoURL}
              alt="logo"
              id="navbar-logo-logo-1"
            />
          </div>
          <div className={styles.menu}>
            <button>
              <img
                src={displayImage(navURLs, "navbar-menu-menu-1")}
                alt="menu"
                id="navbar-menu-menu-1"
              />
            </button>
          </div>
        </div>
      )}

      {!(isTablet) && (
        <>
          <div className={styles.headerDesktopContainer}>
            <HeaderDesktop />
          </div>
          <div className={styles.navBarContainer}>
            <NavBar />
          </div>
        </>
      )}

      <section className={styles.userProfile}>
        <header>
          <div>
            {isSmallDevice ? (
              <img
                role="button"
                onClick={() => window.history.back() || navigate("/")}
                src="/colorback.png"
                alt="colorback"
              />
            ) : (
              <img
                role="button"
                onClick={() => window.history.back() || navigate("/")}
                src="/backarrow.png"
                alt="backarrow"
              />
            )}
            <h1>My Profile</h1>
          </div>
          {isSmallDevice && (
            <button
              className={styles.editSaveButton}
              onClick={handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          )}
        </header>
        <div className={styles.userHeading}>
          {!isSmallDevice && (
            <div>
              <img src="/userphoto.png" alt="userphoto" />
              <h1>{userData.userName || "John Doe"}</h1>
            </div>
          )}
          {!isSmallDevice && (
            <button
              className={styles.editSaveButton}
              onClick={handleEditClick}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          )}
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
          {cards.map((card, index) => (
            <div key={index} className={styles.paymentMethod}>
              <div>
                <img src="/cardicon.png" alt="cardicon" />
                <h1>
                  xxxx xxxx xxxx {card.cardNumber.slice(-4)}
                  <p>{card.nameOnCard}</p>
                </h1>
              </div>
              <img
                src="/editicon.png"
                alt="editicon"
                onClick={() => {
                  handleCardEdit(card);
                }}
              />
            </div>
          ))}
          <div
            className={styles.addCard}
            onClick={() => setIsModalOpen(true)}
          >
            <img src="/add.png" alt="addcard" />
            <h1>Add New Card</h1>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className = {styles.heading}>
              <h2>Edit Payment Method</h2>
              {isMobile && (<img 
              role="button"
              onClick={() => setIsModalOpen(false)}
              src="/closeicon.png" alt="closeicon" />)}
            </div>
            <div className={styles.modalFields}>
              <div>
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={
                    isEditing && currentCard.cardNumber
                      ? `xxxx xxxx xxxx ${currentCard.cardNumber.slice(
                          -4
                        )}`
                      : currentCard.cardNumber || ""
                  }
                  onChange={handleCardInputChange}
                />
              </div>
              <div>
                <label>Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  value={currentCard.expiry}
                  onChange={handleCardInputChange}
                />
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={currentCard.cvv}
                  onChange={handleCardInputChange}
                />
              </div>
              <div>
                <label>Name on Card</label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={currentCard.nameOnCard}
                  onChange={handleCardInputChange}
                />
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => {
                  handleDeleteCard(currentCard);
                }}
                className={styles.leftButton}
              >
                {isTablet?"Delete":"Remove"}
              </button>
              <div className={styles.rightButtons}>
                {!isMobile && (<button
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>)}
                <button
                  className={styles.saveButton}
                  onClick={handleSaveCard}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.footerContainer}>
        <FooterComponent />
      </div>
    </section>
  );
};

export default ProfilePage;
