import React from "react";

const HighCard = ({ index, progress, date, projectTitle, titleIcon, icon }) => {
  return (
    <>
      <div
        key={index}
        className="high-project-card"
        style={{
          backgroundColor:
            progress <= 30
              ? "#f59e9f2f"
              : progress <= 50
              ? "#ffff003e"
              : "#56aed14d",
        }}
      >
        <div className="project-title-icon flex-row" key={index}>
          <div
            className="high-icon"
            style={{
              backgroundColor:
                progress <= 30
                  ? "#f59e9f2f"
                  : progress <= 50
                  ? "#ffff003e"
                  : "#56aed14d",
            }}
          >
            <i
              className={titleIcon}
              style={{
                color:
                  progress <= 30
                    ? "#E05254"
                    : progress <= 50
                    ? "yellow"
                    : "#56AED1",
              }}
            ></i>
          </div>
          <div className="project-title-and-date">
            <h4 className="high-project-name">{projectTitle}</h4>
            <p>
              <i className={icon}></i>{" "}
              {date
                ? new Date(date).toLocaleDateString().replace(/\//g, "-")
                : "Invalid date"}
            </p>
          </div>

        </div>
        <div className="progress-width-high flex-row">
          <div className="progress-con-high">
            <div
              className="progress-bar-high"
              style={{
                width: `${progress? progress:0}%`,
                backgroundColor:
                  progress <= 30
                    ? "#E05254"
                    : progress <= 50
                    ? "yellow"
                    : "#56AED1",
              }}
            ></div>
          </div>
          <span className="progress-text-high">{Math.round(progress? progress:0)}%</span>
        </div>
      </div>
    </>
  );
};

export default HighCard;
