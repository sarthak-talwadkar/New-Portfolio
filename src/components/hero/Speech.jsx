import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";

const Speech = () => {
  return (
    <motion.div
      className="bubbleContainer"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            "> BOOTING SARTHAK_OS v3.2.1...",
            500,
            "> LOADING NEURAL NETWORKS...",
            500,
            "> INITIALIZING ROBOTICS SUBSYSTEMS...",
            500,
            "> SYSTEMS ONLINE - READY FOR COLLABORATION",
            2000,
            "> CURRENT PROJECTS: AUTONOMOUS DRONE SWARM AI",
            1500,
            "> AI TRAINING COMPLETE: 98.7% ACCURACY",
            1500,
            "> HARDWARE STATUS: NOMINAL",
            1500,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          repeat={Infinity}
          style={{ display: "inline-block" }}
        />
      </div>
      <img src="/smallRobot.png" alt="AI Avatar" />
    </motion.div>
  );
};

export default Speech;
