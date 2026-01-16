import { Canvas } from "@react-three/fiber";
import "./hero.css";
import Speech from "./Speech";
import { motion } from "motion/react";
import Shape from "./Shape";
import { Suspense } from "react";
import CV from "../../../public/Sarthak CV.pdf";

const awardVariants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const followVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
};

const skills = [
  { name: "ROS", level: 90 },
  { name: "Python", level: 95 },
  { name: "TensorFlow", level: 85 },
  { name: "Computer Vision", level: 88 },
];

const Hero = () => {
  return (
    <div className="hero">
      <div className="hSection left">
        {/* TITLE */}
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hTitle"
        >
          Hey There,
          <br />
          <span>I'm Sarthak!</span>
        </motion.h1>
        {/* AWARDS */}
        <motion.div
          variants={awardVariants}
          initial="initial"
          animate="animate"
          className="awards"
        >
          <motion.h2 variants={awardVariants}>Robotics & AI Engineer</motion.h2>
          <motion.p variants={awardVariants}>
            I am a passionate Robotics and AI Engineer with a focus on creating
            innovative solutions that bridge the gap between technology and
            real-world applications.
          </motion.p>
          <motion.div
            className="skill-matrix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3>SKILL MATRIX</h3>
            <div className="radar-chart">
              {skills.map((skill, i) => (
                <div key={i} className="skill-bar">
                  <div
                    className="skill-level"
                    style={{ width: `${skill.level}%` }}
                    onMouseEnter={() => console.log(`Hovering ${skill.name}`)}
                  >
                    <span>
                      {skill.name}: {skill.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        {/* SCROLL SVG */}
        {/* FOLLOW */}
        <motion.div
          variants={followVariants}
          initial="initial"
          animate="animate"
          className="follow"
        >
          <motion.a variants={followVariants} href="/">
            <img src="/instagram.png" alt="" />
          </motion.a>
          <motion.a variants={followVariants} href="/">
            <img src="/facebook.png" alt="" />
          </motion.a>
          <motion.a variants={followVariants} href="/">
            <img src="/youtube.png" alt="" />
          </motion.a>
          {/* Resume */}
          <a href={CV} download>
            <button className="resume">Resume</button>
          </a>
        </motion.div>
      </div>
      <motion.a
        animate={{ y: [0, 5], opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        href="#services"
        className="scroll"
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
            stroke="white"
            strokeWidth="1"
          />

          <motion.path
            animate={{ y: [0, 3] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            d="M12 5V8"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <p className="scrolltext">About me</p>
      </motion.a>
      <div className="hSection right">
        <div className="hImg">
          <img src="/hero.png" alt="" />
        </div>
        {/* BUBBLE */}
        <Speech />
      </div>
      <div className="bg">
        {/* 3d */}
        <Canvas>
          <Suspense fallback="loading...">
            <Shape />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
