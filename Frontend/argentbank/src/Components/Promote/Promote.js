import React from "react";

function Promote({ subtitle1, subtitle2, subtitle3, text }) {
  return (
    <section className="hero-content">
      <p className="subtitle">{subtitle1}</p>
      <p className="subtitle">{subtitle2}</p>
      <p className="subtitle">{subtitle3}</p>
      <p className="text">{text}</p>
    </section>
  );
}

export default Promote;
