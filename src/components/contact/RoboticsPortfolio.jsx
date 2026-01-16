import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

// Styles
const styles = `
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Rajdhani", "Orbitron", monospace;
  background: #000;
  color: #fff;
  overflow-x: hidden;
  cursor: crosshair;
}

/* Header Hero Container */
.header-hero {
  height: 100vh;
  position: relative;
  display: flex;
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
}

/* Neural Network Background */
.neural-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

#particles-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Section Container */
.hSection {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
  padding: 50px;
}

.hSection.left {
  align-items: flex-start;
  height: 100%;
}

/* Glitch Title Effect */
.hTitle {
  font-size: clamp(48px, 8vw, 100px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.9;
  font-family: "Orbitron", monospace;
  letter-spacing: 2px;
  animation: glow 2s ease-in-out infinite alternate;
  margin-bottom: 20px;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff,
      0 0 40px #00ffff;
  }
  to {
    text-shadow: 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff,
      0 0 50px #ff00ff;
  }
}

.hTitle::before,
.hTitle::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hTitle::before {
  animation: glitch-1 0.5s infinite;
  color: #00ffff;
  z-index: -1;
}

.hTitle::after {
  animation: glitch-2 0.5s infinite;
  color: #ff00ff;
  z-index: -2;
}

@keyframes holographic {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5),
      inset 0 0 20px rgba(255, 0, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 0, 255, 0.5),
      inset 0 0 20px rgba(0, 255, 255, 0.1);
  }
}

/* Skill Matrix */
.skill-matrix h3 {
  color: #00ffff;
  margin-bottom: 20px;
  font-family: "Orbitron", monospace;
  letter-spacing: 3px;
  font-size: 0.9rem;
}

.skill-item {
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.skill-name {
  display: inline-block;
  width: 150px;
  font-size: 0.9rem;
  color: #fff;
  font-weight: 500;
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.skill-level {
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  border-radius: 10px;
  position: relative;
  animation: pulse 2s infinite;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.skill-percentage {
  color: #00ffff;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 10px;
  min-width: 35px;
}

/* Tech Stack Grid */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin: 30px 0;
  max-width: 600px;
}

.tech-item {
  padding: 15px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-weight: 500;
}

.tech-item::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border-radius: 5px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
}

.tech-item:hover::before {
  opacity: 1;
}

.tech-item:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.5);
}

/* Terminal Console */
.terminal-console {
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 400px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ffff;
  border-radius: 10px;
  padding: 20px;
  font-family: "Courier New", monospace;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
  z-index: 20;
}

.terminal-header {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red {
  background: #ff5f56;
}
.terminal-dot.yellow {
  background: #ffbd2e;
}
.terminal-dot.green {
  background: #27c93f;
}

.terminal-text {
  color: #00ff00;
  font-size: 14px;
  line-height: 1.6;
}

.terminal-text pre {
  font-family: "Courier New", monospace;
  white-space: pre-wrap;
  margin: 0;
}

.typing-cursor {
  display: inline-block;
  width: 10px;
  height: 20px;
  background: #00ff00;
  animation: blink 1s infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* CTA Buttons */
.cta-container {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.cta-button {
  padding: 15px 30px;
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  font-family: "Orbitron", monospace;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  text-transform: uppercase;
}

.cta-button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.cta-button:hover::before {
  width: 300px;
  height: 300px;
}

.cta-button:hover {
  color: #000;
  border-color: #ff00ff;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 0, 255, 0.5);
}

.cta-button.primary {
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border: none;
  color: #000;
  font-weight: bold;
}

.cta-button.primary:hover {
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  transform: translateY(-3px) scale(1.05);
}

/* Floating Elements */
.floating-icons {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.floating-icon {
  position: absolute;
  font-size: 2rem;
  opacity: 0.3;
  animation: float 20s infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(-100px) translateX(50px) rotate(90deg);
  }
  50% {
    transform: translateY(-50px) translateX(-30px) rotate(180deg);
  }
  75% {
    transform: translateY(-150px) translateX(-50px) rotate(270deg);
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: fixed;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-dot {
  animation: scroll-dot 2s infinite;
}

@keyframes scroll-dot {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

.scroll-text {
  font-size: 0.8rem;
  color: #00ffff;
  letter-spacing: 2px;
  font-family: "Orbitron", monospace;
}

/* Right Section Styles */
.hSection.right {
  align-items: flex-end;
  justify-content: center;
}

.hImg {
  position: relative;
  height: 80%;
  width: auto;
  transform: translateX(20%);
}

.hImg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.7));
}

/* Bubble Container */
.bubbleContainer {
  position: absolute;
  bottom: 120px;
  right: 50px;
  display: flex;
  align-items: flex-end;
  gap: 15px;
  z-index: 15;
  max-width: 400px;
}

.bubble {
  width: 100%;
  padding: 20px;
  background: rgba(14, 13, 13, 0.7);
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #2fff05;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  position: relative;
  overflow: hidden;
}

.bubble::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(0, 255, 255, 0.8), 
    transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.bubbleContainer img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #dd4c62;
  border: 2px solid #00ffff;
}

/* Social Links */
.follow {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.follow a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  transition: all 0.3s;
}

.follow a:hover {
  background: rgba(0, 255, 255, 0.3);
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.5);
}

.follow img {
  width: 20px;
  height: 20px;
  filter: invert(1);
}

/* Resume Button */
.resume {
  padding: 12px 25px;
  background: linear-gradient(145deg, #dd4c62, #2f204e);
  box-shadow: 0 0 10px rgba(221, 76, 98, 0.7);
  transition: all 0.3s ease;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
}

.resume:hover {
  background: linear-gradient(145deg, #2f204e, #dd4c62);
  box-shadow: 0 0 20px rgba(221, 76, 98, 0.9);
  transform: translateY(-3px);
}

/* 3D Background */
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hSection {
    padding: 30px;
  }

  .terminal-console {
    width: 350px;
    right: 30px;
    bottom: 30px;
  }

  .hTitle {
    font-size: 4rem;
  }
  
  .bubbleContainer {
    right: 30px;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .header-hero {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  .hSection {
    width: 100%;
    padding: 20px;
    justify-content: center;
  }

  .terminal-console {
    width: 90%;
    right: 5%;
    left: 5%;
    bottom: 20px;
    max-height: 200px;
    overflow-y: auto;
    position: fixed;
  }

  .hTitle {
    font-size: 3rem;
  }

  .hImg {
    transform: translateX(0);
    height: 300px;
    margin: 0 auto;
  }
  
  .bubbleContainer {
    position: relative;
    bottom: auto;
    right: auto;
    margin: 30px auto;
    max-width: 100%;
  }
  
  .tech-grid {
    max-width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }

  .cta-container {
    flex-direction: column;
    width: 100%;
  }

  .cta-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hTitle {
    font-size: 2.5rem;
  }

  .skill-name {
    width: 120px;
    font-size: 0.8rem;
  }

  .terminal-console {
    font-size: 12px;
    padding: 15px;
  }
  
  .follow {
    justify-content: center;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00ffff, #ff00ff);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #ff00ff, #00ffff);
}
`;

// Particle Network Component
const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 200;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${
              0.2 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationId;
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="neural-bg">
      <canvas ref={canvasRef} id="particles-canvas"></canvas>
    </div>
  );
};

// Terminal Component
const Terminal = () => {
  const [terminalText, setTerminalText] = useState("");

  useEffect(() => {
    const terminalMessages = [
      "> Initializing AI Systems...",
      "> Loading Neural Networks...",
      "> Calibrating Sensors...",
      "> Establishing ROS Connections...",
      "> Computer Vision: ONLINE",
      "> SLAM Module: ACTIVE",
      "> Path Planning: READY",
      "> System Status: OPERATIONAL",
      "",
      "> Current Projects:",
      "  - Autonomous Drone Swarm",
      "  - Robotic Arm Manipulation",
      "  - Deep Learning Vision System",
      "",
      "> Ready for collaboration...",
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let currentMessage = "";
    let typingTimeout;

    const typeMessage = () => {
      if (messageIndex < terminalMessages.length) {
        if (charIndex < terminalMessages[messageIndex].length) {
          currentMessage += terminalMessages[messageIndex][charIndex];
          setTerminalText(currentMessage);
          charIndex++;
          typingTimeout = setTimeout(typeMessage, 50);
        } else {
          currentMessage += "\n";
          setTerminalText(currentMessage);
          messageIndex++;
          charIndex = 0;
          typingTimeout = setTimeout(typeMessage, 300);
        }
      } else {
        typingTimeout = setTimeout(() => {
          currentMessage = "";
          setTerminalText("");
          messageIndex = 0;
          charIndex = 0;
          typeMessage();
        }, 3000);
      }
    };

    typeMessage();

    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <motion.div
      className="terminal-console"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
      </div>
      <div className="terminal-text">
        <pre>{terminalText}</pre>
        <span className="typing-cursor"></span>
      </div>
    </motion.div>
  );
};

// 3D Shape Component
const Shape = () => {
  return (
    <>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#DB8B9B"
          attach="material"
          distort={0.5}
          speed={2}
        />
      </Sphere>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 2, 3]} />
    </>
  );
};

// Speech Bubble Component
const SpeechBubble = () => {
  return (
    <motion.div
      className="bubbleContainer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
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

// Main Component
const RoboticsPortfolio = () => {
  const skills = [
    { name: "ROS/ROS2", level: 92 },
    { name: "Python/C++", level: 95 },
    { name: "TensorFlow/PyTorch", level: 88 },
    { name: "Computer Vision", level: 90 },
    { name: "SLAM/Navigation", level: 85 },
  ];

  const techStack = [
    "OpenCV",
    "CUDA",
    "Gazebo",
    "Docker",
    "AWS",
    "Arduino",
    "MoveIt",
    "RVIZ",
  ];

  const awardVariants = {
    initial: { x: -100, opacity: 0 },
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
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <style>{styles}</style>
      <div className="header-hero">
        <ParticleNetwork />

        {/* Left Section */}
        <div className="hSection left">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="hTitle"
            data-text="Hey There, I'm Sarthak!"
          ></motion.h1>

          <motion.h2
            variants={awardVariants}
            initial="initial"
            animate="animate"
            style={{
              color: "#00ffff",
              marginBottom: "20px",
              fontFamily: "Orbitron",
            }}
          >
            Robotics & AI Engineer
          </motion.h2>

          <motion.p
            variants={awardVariants}
            initial="initial"
            animate="animate"
            style={{
              marginBottom: "30px",
              maxWidth: "500px",
              lineHeight: "1.6",
            }}
          >
            I am a passionate Robotics and AI Engineer with a focus on creating
            innovative solutions that bridge the gap between technology and
            real-world applications.
          </motion.p>

          {/* Skill Matrix */}
          <motion.div
            className="skill-matrix"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3>SKILL MATRIX</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar">
                  <div
                    className="skill-level"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="tech-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="tech-item"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.2 + index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="cta-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <button className="cta-button primary">View Projects</button>
            <button className="cta-button">Contact Me</button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={followVariants}
            initial="initial"
            animate="animate"
            className="follow"
          >
            <motion.a variants={followVariants} href="/">
              <img src="/instagram.png" alt="Instagram" />
            </motion.a>
            <motion.a variants={followVariants} href="/">
              <img src="/facebook.png" alt="Facebook" />
            </motion.a>
            <motion.a variants={followVariants} href="/">
              <img src="/youtube.png" alt="YouTube" />
            </motion.a>

            {/* Resume Download */}
            <a href="/Sarthak_CV.pdf" download>
              <button className="resume">Resume</button>
            </a>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="hSection right">
          <div className="hImg">
            <img src="/hero.png" alt="Robotics Engineer" />
          </div>
          <SpeechBubble />
        </div>

        {/* 3D Background */}
        <div className="bg">
          <Canvas>
            <Shape />
          </Canvas>
        </div>

        <Terminal />

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
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
          <p className="scroll-text">Scroll To Explore</p>
        </motion.div>
      </div>
    </>
  );
};

export default RoboticsPortfolio;
