import React from "react";
import Button from "../Button/Button";

function AccountInfo({ title, amount, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>

        <div className="cta">
          <Button
            text="View Transactions"
            className="transaction-button"
            type="submit"
          />
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;
