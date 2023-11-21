import React from "react";
import Promote from "../Promote/Promote";
import Feature from "../Feature/Feature";
import chat from "../../Assets/Images/icon-chat.webp";
import money from "../../Assets/Images/icon-money.webp";
import security from "../../Assets/Images/icon-security.webp";

function Accueil() {
  return (
    <section>
      <div className="hero"></div>
      <Promote
        subtitle1="No fees."
        subtitle2="No minimum deposit."
        subtitle3="High interest rates."
        text="Open a savings account with Argent Bank today!"
      />
      <section className="features">
        <Feature
          iconSrc={chat}
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Feature
          iconSrc={money}
          title="More savings means higher rates"
          description="The more you save with us, the higher your interest rate will be!"
        />
        <Feature
          iconSrc={security}
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </section>
  );
}

export default Accueil;
