import styles from "./information.module.css";
import useImage from "../../../../customHook/useImage";
import { displayImage } from "../../../../utility/imageProcess";

const Information = () => {

  const imageURLs = useImage("page", "information");

  return (
    <section className={styles.information}>
      <div className={styles.content}>
        <div className={styles.deliveryInformation}>
          <img
            id="information-deliveryinformation-tracking-1"
            className={styles.tracking}
            src={displayImage(imageURLs, "information-deliveryinformation-tracking-1")}
            alt="tracking"
          />
          <img
            id="information-deliveryinformation-deliveryinfo-1"
            src={displayImage(imageURLs, "information-deliveryinformation-deliveryinfo-1")}
            alt="deliveryinfo"
          />
        </div>
        <div className={styles.contactInformation}>
          <img
            id="information-contactinformation-idverified-1"
            src={displayImage(imageURLs, "information-contactinformation-idverified-1")}
            alt="idverified"
          />
          <h1>Contact information</h1>
          <p className={styles.description}>
            If you have allergies or other dietary restrictions,
            please contact the restaurant. The restaurant will provide
            food-specific information upon request.
          </p>
          <p>Phone number</p>
          <p>+934443-43</p>
          <p>Website</p>
          <p>http://mcdonalds.uk/</p>
        </div>
        <div className={styles.operationalInformation}>
          <img
            id="information-operationalinformation-clock-1"
            className={styles.clock}
            src={displayImage(imageURLs, "information-operationalinformation-clock-1")}
            alt="clock"
          />
          <h1>Operational Times</h1>
          <img
            id="information-operationalinformation-operationinfo-1"
            src={displayImage(imageURLs, "information-operationalinformation-operationinfo-1")}
            alt="operationinfo"
          />
        </div>
      </div>
    </section>
  );
};

export default Information;
