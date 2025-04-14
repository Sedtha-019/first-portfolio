import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, BookOpen, Briefcase, ChevronRight } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 120 }
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2 
            variants={itemVariants}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
          >
            About Me
            <div className="mt-4 w-24 h-1 bg-emerald-500 mx-auto rounded-full" />
          </motion.h2>

          {/* Introduction */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 mb-16 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Motivated senior-year Data Science student at the Institute of Technology of Cambodia with expertise in data analysis,  
            programming, and statistical modeling. Skilled in building machine learning models, developing computer vision systems,  
            and implementing object detection projects. Committed to leveraging data-driven strategies to solve complex challenges  
            and deliver impactful solutions. Strong communicator with a proven ability to collaborate effectively across disciplines.
          </p>

          </motion.div>

          {/* Expertise Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {/* Education Card */}
            <motion.div 
              variants={itemVariants}
              className="group bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex items-center gap-4">
                <BookOpen className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              <ul className="space-y-4">
                {/* ITC Education */}
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Institute of Technology of Cambodia (ITC) (2021-2026)<br />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">Engineering Degree in Data Science</span><br />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">GPA: 3.5</span>
                  </span>
                </li>
                {/* Anlong Veng High School */}
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Anlong Veng High School (2015-2021)<br />
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">Archive Grade: A</span>
                  </span>
                </li>
              </ul>
            </motion.div>
            {/* Expertise Card */}
            <motion.div 
              variants={itemVariants}
              className="group bg-teal-50 dark:bg-teal-900/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex items-center gap-4">
                <Award className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Expertise</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Machine Learning & Deep Learning (PyTorch, Scikit-Learn, CNNs, YOLO, Faster R-CNN)',
                  'Computer Vision & Object Detection (Face Recognition, Image Processing, OpenCV)',
                  'Data Science & Analytics (PySpark, Pandas, Power BI, Data Visualization)',
                  'Web Scraping & Automation (Selenium, BeautifulSoup, Task Scheduling)',
                  'IoT & Embedded Systems (ESP32-CAM, NodeMCU, ROS for Smart Factories)'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Experience Card */}
            <motion.div 
              variants={itemVariants}
              className="group bg-cyan-50 dark:bg-cyan-900/20 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 flex items-center gap-4">
                <Briefcase className="w-12 h-12 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
              </div>
              <ul className="space-y-4">
                {/* Data Analyst Intern */}
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Data Analyst Intern<br />
                    <span className="text-sm text-cyan-600 dark:text-cyan-400">SEARLE Company (September - October 2024)</span>
                  </span>
                </li>
                
                {/* Volunteer Experience */}
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Volunteer<br />
                    <span className="text-sm text-cyan-600 dark:text-cyan-400">IDP Education (15 March 2024)</span><br />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      • Assisted international students with communication during university talks, enrollment, and orientation<br />
                      • Collaborated with staff to create a welcoming environment<br />
                      • Praised for clear and accurate interpreting
                    </span>
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <a 
              href="/SEDTHA MAO (1).pdf" 
              download 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <Download className="w-6 h-6" />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;