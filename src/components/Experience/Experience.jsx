// Experience.js
import React from "react";
import styles from "./Experience.css";

const exps = [
  {
    title: "Senior Systems Engineer",
    organization: "Tata Consultancy Services Ltd.",
    duration: "December 2021 - June 2024",
    description:
      "At TCS, I worked on large-scale enterprise systems serving millions of users daily. I architected microservices using Spring Boot and implemented advanced security with OAuth2 and cryptographic methods.\n\nOne of my most rewarding projects was developing a machine learning model for user credibility prediction, combining data science with practical business impact. I also led a team of six developers, implementing Agile practices that dramatically improved our delivery speed.\n\nThis experience gave me a solid foundation in enterprise software development and showed me how technology decisions at scale drive real business outcomes.",
  },
  {
    title: "Graduate Engineer",
    organization: "Reliance Retail Pvt. Ltd.",
    duration: "August 2021 - December 2021",
    description:
      "At Reliance Retail, I automated manual reporting processes using Tableau and SAP, transforming raw data into actionable insights. I developed Python-based automation systems for warehouse operations that increased quarterly profits by 15%.\n\nI analyzed operational data to identify inefficiencies and recommend workflow improvements. This experience taught me to think like both an engineer and business analyst, understanding not just how to build solutions, but why they matter.\n\nThe combination of data analysis, automation, and process optimization I learned here directly influences how I approach robotics projects today.",
  },
];

function Experience() {
  return (
    <section id="experience" className={styles.timelineSection}>
      <div className={styles.container}>
        <h1 className={styles.sectionTitle}>Professional Journey</h1>

        <div className={styles.timelineContainer}>
          {/* Timeline Line */}
          <div className={styles.timelineLine}></div>

          {exps.map((exp, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${
                index % 2 === 0
                  ? styles.timelineItemLeft
                  : styles.timelineItemRight
              }`}
            >
              {/* Timeline Dot */}
              <div className={styles.timelineDot}></div>

              {/* Content Card */}
              <div className={styles.timelineContent}>
                <div className={styles.experienceCard}>
                  {/* Speech Bubble Arrow */}
                  <div className={styles.arrow}></div>

                  {/* Duration Badge */}
                  <div className={styles.durationBadge}>{exp.duration}</div>

                  {/* Title and Organization */}
                  <h3 className={styles.jobTitle}>{exp.title}</h3>
                  <p className={styles.organization}>{exp.organization}</p>

                  {/* Description */}
                  <div className={styles.description}>
                    {exp.description.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className={styles.paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Timeline End Dot */}
          <div className={styles.timelineEndDot}></div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
