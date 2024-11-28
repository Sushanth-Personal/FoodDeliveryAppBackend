import styles from "./productdisplay.module.css";
import { useState, useEffect } from "react";
import useImage from "../../../../customHook/useImage";
import useRestaurant from "../../../../customHook/useRestaurant";
import { displayImage } from "../../../../utility/ImageProcess";
import useDragToScroll from "../../../../customHook/useDragToScroll"; // Import the custom hook
import { useUserContext } from "../../../../Contexts/UserContext";
import Cart from "../../../../components/Cart/Cart";
import useCart from "../../../../customHook/useCart";
import {handleAddToCart} from "../../../../utility/handleAddToCart";
const ProductDisplay = ({ restaurantId, restaurantName }) => {
  // State variables
  const [product, setProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const { isCartClicked,cartItems} = useUserContext();

  // Custom hooks
  const { addToCart } = useCart();
  const restURLs = useImage("page", restaurantName);
  const imageURLs = useImage("page", "productdisplay");
  const { data, loading } = useRestaurant(restaurantId);
  const {
    listRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
  } = useDragToScroll(); // Use the custom hook

  // Functions
  const handleChange = (e) => {
    setProduct(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setProduct(e.target.value);
    }
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  

  const handleAddToCartClick = (product) => {
    addToCart(product); // Add product to cart using the custom hook
  };
  
  return (
    <section className={styles.productDisplay}>
      <div className={styles.searchNavBar}>
        <h1>All Offers from McDonald’s East London</h1>
        <div className={styles.searchBox}>
          <img
            id="productdisplay-searchbox-searchicon-1"
            src={displayImage(
              imageURLs,
              "productdisplay-searchbox-searchicon-1"
            )}
            alt=""
          />
          <input
            type="text"
            placeholder="Search from menu..."
            name="product"
            value={product}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      <div className={styles.categoryNavBar}>
        <ul
          ref={listRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave} // Reset when mouse leaves the list
        >
          {data && data.menu && data.menu.length > 0 ? (
            [
              ...new Set(
                data.menu.map((item) => item.productCategory)
              ),
            ].map((category, index) => (
              <li
                key={index}
                className={
                  selectedCategory === category
                    ? styles.selectedCategory
                    : ""
                }
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))
          ) : (
            <li>No categories available</li>
          )}
        </ul>
      </div>

      <div className={styles.filterDisplaySection}>
        <div className={styles.productFilter}>
          <h1>{selectedCategory}</h1>
          <div className={styles.tilesContainer}>
            {data && data.menu ? (
              data.menu
                .filter(
                  (item) => item.productCategory === selectedCategory
                )
                .map((product) => (
                  <div
                    className={styles.productTile}
                    key={product._id}
                  >
                    <div className={styles.content}>
                      <div className={styles.leftContent}>
                        <h1>{product.productName}</h1>
                        <p>{product.productDescription}</p>
                        <h3>£{product.productPrice}</h3>
                      </div>
                      <div className={styles.rightContent}>
                        <img
                          className={styles.productImage}
                          src={displayImage(
                            restURLs,
                            product.productImageId
                          )}
                          alt={product.productName}
                        />
                        <img
                          role="button"
                          onClick={() => handleAddToCartClick(product)} // Pass product as argument
                          className={styles.plus}
                          src="/Plus.png"
                          alt="Add"
                        />
                        <img
                          role="button"
                          onClick={() => handleAddToCart(product)} // Pass product as argument
                          className={styles.addButton}
                          src="/addButton.png"
                          alt="Add to cart"
                        />
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
        {isCartClicked && (
          <div className={styles.cart}>
            <Cart />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDisplay;
