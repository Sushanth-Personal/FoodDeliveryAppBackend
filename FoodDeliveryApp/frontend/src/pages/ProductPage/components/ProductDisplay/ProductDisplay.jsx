import styles from "./productdisplay.module.css";
import { useState, useEffect } from "react";
import useImage from "../../../../customHook/useImage";
import useRestaurant from "../../../../customHook/useRestaurant";
import { displayImage } from "../../../../utility/ImageProcess";
import useDragToScroll from "../../../../customHook/useDragToScroll"; // Import the custom hook

const ProductDisplay = ({ restaurantId, restaurantName }) => {

  // State variables
  const [product, setProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  // Custom hooks
  const imageURLs = useImage("page", restaurantName);
  const { data, loading } = useRestaurant(restaurantId);
  const { listRef, handleMouseDown, handleMouseUp, handleMouseMove, handleMouseLeave } = useDragToScroll(); // Use the custom hook

  // SideEffects
  useEffect(() => {
    console.log("data", data);
  }, [data, loading]);

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

  return (
    <section className={styles.productDisplay}>
      <div className={styles.searchNavBar}>
        <h1>All Offers from McDonald’s East London</h1>
        <div className={styles.searchBox}>
          <img src="/search.png" alt="" />
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
              ...new Set(data.menu.map((item) => item.productCategory)),
            ].map((category, index) => (
              <li 
                key={index}
                className={selectedCategory === category ? styles.selectedCategory : ""}
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
                .filter((item) => item.productCategory === selectedCategory)
                .map((product) => (
                  <div className={styles.productTile} key={product._id}>
                    <div className={styles.content}>
                      <div className={styles.leftContent}>
                        <h1>{product.productName}</h1>
                        <p>{product.productDescription}</p>
                        <h3>£{product.productPrice}</h3>
                      </div>
                      <div className={styles.rightContent}>
                        <img
                          className={styles.productImage}
                          src={displayImage(imageURLs, product.productImageId)} // Adjust based on your logic for image fetching
                          alt={product.productName}
                        />
                        <img className={styles.plus} src="/Plus.png" alt="Add" />
                        <img className={styles.addButton} src="/addButton.png" alt="Add to cart" />
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
        <div className={styles.checkout}></div>
      </div>
    </section>
  );
};

export default ProductDisplay;
