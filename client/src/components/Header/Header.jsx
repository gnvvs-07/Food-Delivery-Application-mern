import React, { useState, useEffect } from "react";
import "./Header.css";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
export default function Header() {
  // Array of image URLs
  const images = [
    "/header_img.png",
    "/header_img_2.jpg",
    "/header_img_3.jpg",
    "/header_img_4.jpg",
    "/header_img_5.jpg",
    "/header_img_6.jpg",
    "/header_img_7.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Current index of the displayed image

  // Function to set background image
  function setBackgroundImage(index) {
    const header = document.getElementById("header");
    if (header) {
      header.style.backgroundImage = `url('${images[index]}')`;
    }
  }

  // Function to display previous image
  function prevImage() {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  }

  // Function to display next image
  function nextImage() {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  }

  // Call the function initially and whenever currentIndex changes
  useEffect(() => {
    setBackgroundImage(currentIndex);
  }, [currentIndex]);

  return (
    <div className="header" id="header">
      <div className="header-contents">
        <h2>Order now</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          consequatur saepe est repudiandae nisi, soluta voluptate. Repellat
          nesciunt perspiciatis harum aspernatur ut, in eveniet dolor.
        </p>
        <button>View Menu</button>
      </div>
      <div className="slider">
        <button id="prevBtn" onClick={prevImage}>
          <GrFormPrevious />
        </button>
        <button id="nextBtn" onClick={nextImage}>
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}
