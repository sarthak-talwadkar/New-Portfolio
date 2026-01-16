import React from "react";
import styles from "./About.css";

function AboutMe() {
  return (
    <section id="about" className={styles.aboutMe}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <h1 className={styles.heading}>About Me</h1>
          <p className={styles.description}>
            I'm genuinely fascinated by the intersection of robotics and AI -
            there's something incredibly exciting about building systems that
            can perceive, understand, and navigate the world autonomously. My
            journey started with mechanical engineering, but I quickly realized
            my passion lay in bringing robots to life through intelligent
            algorithms.
          </p>
          <p className={styles.description}>
            What really gets me excited is working on SLAM and computer vision
            problems - the challenge of helping a robot figure out where it is
            while simultaneously mapping its environment is like solving a
            complex puzzle that directly impacts how machines interact with our
            world. Whether I'm optimizing path planning algorithms or training
            deep learning models for image enhancement, I love the
            problem-solving aspect and seeing tangible results.
          </p>
          <p className={styles.description}>
            I've been lucky to work on projects ranging from real-time
            navigation systems to computer vision applications, and each one
            reinforces why I chose this field. There's something deeply
            satisfying about writing code that makes a robot smarter or helps it
            see the world more clearly. The rapid evolution in AI and robotics
            means there's always something new to learn and explore, which keeps
            me constantly motivated and curious about what's possible next.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
