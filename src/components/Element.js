import React from "react";
import "./Element.css";

function Element({
  avatar,
  repositoryName,
  repositoryDescription,
  numberOfStars,
  numberOfIssues,
  timeInterval,
  ownerName,
}) {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <div className="element">
      <div className="element__avatar">
        <img src={avatar} alt={ownerName} className="element__avatarImage" />
      </div>
      <div className="element__info">
        <h2>{repositoryName}</h2>
        <p>{truncate(repositoryDescription, 80)}</p>
        <span className="element__infoStars">Stars: {numberOfStars}</span>{" "}
        <span className="element__infoIssues">Issues: {numberOfIssues}</span>{" "}
        Submitted {timeInterval} by {ownerName}
      </div>
    </div>
  );
}

export default Element;
