"use client";

import Header from "@/components/Header";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Details from "@/components/Details";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Animation variants for the Details panel
  const detailsVariants = {
    hidden: { x: '-5%', opacity: 0 }, // Slide slightly to the left
    visible: { x: 0, opacity: 1 }, // Slide into view
  };

  // New container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each child animation
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Variants for individual sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const handleProjectClick = (project) => {
    // Check if the new project is the same as the current one to avoid unnecessary animation
    if (project === selectedProject) return;

    // Hide the details panel by setting the state to null first
    setSelectedProject(null);

    // Add a small delay to let the panel animate out before displaying the new project
    setTimeout(() => {
      setSelectedProject(project);
    }, 100); // Adjust the delay to match the animation timing for smoother effect
  };

  return (
    <motion.div 
      className="md:fixed flex flex-col h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with fade-in */}
      <motion.div variants={sectionVariants}>
        <Header />
      </motion.div>

      {/* Main content grows to fill space, ensuring footer is at the bottom */}
      <div className="flex-grow flex">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full ">
          {/* Projects comes first */}
          <motion.div variants={sectionVariants}>
            <Projects setSelectedProject={handleProjectClick} className="z-10" />
          </motion.div>

          {/* Details component wrapped with motion.div for animation */}
          <motion.div
            className="relative col-span-1 z-0" // Relative positioning to stay within its grid cell
            initial="hidden"
            animate={selectedProject ? "visible" : "hidden"}
            variants={detailsVariants}
            transition={{ type: 'anticipate', stiffness: 100, damping: 20 }}
          >
            <Details selectedProject={selectedProject} />
          </motion.div>

          {/* About comes last */}
          <motion.div variants={sectionVariants}>
            <About />
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
}
