import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./header.css";

const header = () => {
  const canvasRef = useRef(null);
  const [terminalText, setTerminalText] = useState("");
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  // Skills data
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

  // Particle Network Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    const particles = [];
    const particleCount = 100;

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
      canvas.width = window.innerWidth - 100;
      canvas.height = window.innerHeight - 100;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Terminal typing effect
  useEffect(() => {
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

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.5 + i * 0.1 },
    }),
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1 + i * 0.05,
        type: "spring",
        stiffness: 200,
      },
    }),
  };

  return (
    <div className="hero">
      {/* Neural Network Background */}
      <div className="neural-bg">
        <canvas ref={canvasRef} id="particles-canvas"></canvas>
      </div>

      {/* Floating Icons */}
      <div className="floating-icons">
        <div
          className="floating-icon"
          style={{ top: "10%", left: "10%", animationDelay: "0s" }}
        >
          🤖
        </div>
        <div
          className="floating-icon"
          style={{ top: "20%", left: "80%", animationDelay: "2s" }}
        >
          ⚡
        </div>
        <div
          className="floating-icon"
          style={{ top: "60%", left: "15%", animationDelay: "4s" }}
        >
          🔧
        </div>
        <div
          className="floating-icon"
          style={{ top: "70%", left: "70%", animationDelay: "6s" }}
        >
          💻
        </div>
        <div
          className="floating-icon"
          style={{ top: "40%", left: "50%", animationDelay: "8s" }}
        >
          🚀
        </div>
      </div>

      <div className="hSection left">
        <div>
          {/* Title with Glitch Effect */}
          <motion.h1
            className="hTitle"
            data-text="SARTHAK"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            SARTHAK
          </motion.h1>

          <motion.div
            className="subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            ROBOTICS & AI ENGINEER
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Architecting the future through autonomous systems, neural networks,
            and cutting-edge robotics. Specializing in computer vision, deep
            learning, and intelligent automation.
          </motion.p>

          {/* Holographic Skill Matrix */}
          <motion.div
            className="skill-matrix"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3>// CORE COMPETENCIES</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                custom={index}
                variants={skillVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="skill-name">{skill.name}</span>
                <span className="skill-bar">
                  <span
                    className="skill-level"
                    style={{
                      width: skillsAnimated ? `${skill.level}%` : "0%",
                    }}
                  ></span>
                </span>
                <span className="skill-percentage">{skill.level}%</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack Grid */}
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="tech-item"
                custom={index}
                variants={techVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                {tech}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <button className="cta-button primary">VIEW PROJECTS</button>
            <button className="cta-button">DOWNLOAD CV</button>
            <button className="cta-button">CONTACT</button>
          </motion.div>
        </div>
      </div>

      {/* Terminal Console */}
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

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg width="30" height="50" viewBox="0 0 30 50">
          <rect
            x="10"
            y="10"
            width="10"
            height="20"
            rx="5"
            stroke="#00ffff"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="15" cy="20" r="3" fill="#00ffff" className="scroll-dot" />
        </svg>
        <p className="scroll-text">SCROLL TO EXPLORE</p>
      </motion.div>
    </div>
  );
};

export default header;
