import React from "react";

const Banner = () => {
  return (
    <div className="mt-3 custom-banner">
      <img
        src={require('../img/whatBanner.jpg')}
        className="card-img rounded-5 custom-banner-img-desktop"
        alt="..."
      />

       <img
        src={require('../img/whatBanner-mob.jpg')}
        className="card-img custom-banner-img-mobile"
        alt="..."
      />
    </div>
  );
};

export default Banner;
