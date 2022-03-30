import React from "react";

export default function Card({ image, choice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) choice(image);
  };
  // const flipped = true;
  return (
    <div className="relative">
      <div>
        <img
          src={image.pic}
          alt="card-front"
          className={flipped ? "flipped-front front" : "front"}
        />
        <img
          src="/img/cover.png"
          className={flipped ? "flipped-back back" : "back"}
          alt="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
