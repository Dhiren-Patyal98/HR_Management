import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image from "../../images/dashboardHR.png";
import styles from "./slick.module.css";

const slideData = [
  {
    id: 1,
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    text2:
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    text2:
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    text1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    text2:
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function SlickSlider() {
  return (
    <>
      <div className={styles.slider}>
        <Carousel showThumbs={false} showIndicators={true}>
          {slideData.map(({ id, text1, text2 }) => (
            <div key={id}>
              <img
                src={image}
                alt={`Slide ${id}`}
                className={styles.imageSize}
              />
              <p className={styles.textOne}>{text1}</p>
              <p className={styles.textTwo}>{text2}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
