import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

// Create the context
const UserContext = createContext({
  isCartClicked: false,
  setIsCartClicked: () => {}, // Default placeholder
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isCartClicked, setIsCartClicked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([
   ]);

  const value = useMemo(
    () => ({
      isCartClicked,
      setIsCartClicked,
      userId,
      setUserId,
      cartItems,
      setCartItems
    }),
    [
      isCartClicked,
      setIsCartClicked,
      userId,
      setUserId,
      cartItems,
      setCartItems
    ]
  );

  return (
    <UserContext.Provider value={value}>
      {children} {/* Render the children inside the provider */}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserProvider"
    );
  }
  return context;
};

// PropTypes validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Set a display name for debugging
UserContext.displayName = "UserContext";

export default UserContext;
