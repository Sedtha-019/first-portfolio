import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Brain, Code, Database, GraduationCap } from 'lucide-react';
import MeImage from '/ME.jpg'; // Adjust the relative path if needed
import { useEffect } from "react";


const Home = () => {
  useEffect(() => {
        document.title = "MAO SEDTHA"; // Ensure React sets the title
      }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      {/* University Logos - Adjusted size and position */}
      <div className="w-full py-16 px-1">
        <div className="container mx-auto flex items-center gap-12">
          {/* First Logo - Made bigger */}
          <img
            src="https://itc.edu.kh/wp-content/uploads/2021/02/cropped-Logo-ITC.png"
            alt="University Logo"
            className="w-48 h-48 md:w-32 md:h-32 object-contain"
          />
          {/* Second Logo - Made bigger */}
          <img
            src="AMS2.png"
            alt="Second Logo"
            className="w-48 h-48 md:w-33 md:h-33 object-contain"
          />
        </div>
      </div>

      {/* Main Content - Kept the same */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Section: Text Content - Unchanged */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
            <GraduationCap className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">ITC</span>
          </div>
          <h1
            className="text-5xl md:text-7xl xl:text-8xl font-bold mb-6 text-gray-900 dark:text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">
              SEDTHA
            </span>
          </h1>
          <div className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300">
            <TypeAnimation
              sequence={[
                'AI & MACHINE LEARNING ENGINEER',
                2000,
                'COMPUTER VISION RESEARCHER',
                2000,
                'DATA SCIENTIST',
                2000,
                'DEEP LEARNING SPECIALIST',
                2000,
                'MLOPS PRACTITIONER',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-semibold"
            />
          </div>
          <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 leading-relaxed">
            🚀 Passionate about{' '}
            <span className="text-blue-600 dark:text-blue-400">AI, NLP, and Computer Vision</span>, solving real-world
            challenges with intelligent solutions. Focused on{' '}
            <span className="text-blue-600 dark:text-blue-400">data-driven insights</span> and{' '}
            <span className="text-blue-600 dark:text-blue-400">machine learning</span> to drive innovation.
            <br />
            <span className="text-purple-600 dark:text-purple-400">cutting-edge AI applications</span>.
          </p>
          <div className="flex justify-center lg:justify-start gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/50"
            >
              <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/50"
            >
              <Code className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-lg bg-cyan-100 dark:bg-cyan-900/50"
            >
              <Database className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Section: Image or Robot - Unchanged */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <div
            className="robot-image w-full h-96 rounded-lg"
            style={{
              backgroundImage: `url(${MeImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          {/* <div className="robot-face mx-auto mb-12 w-32 h-32 rounded-full flex items-center justify-center shadow-lg"></div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;