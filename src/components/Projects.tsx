import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Github, ExternalLink, Flame, Car, Scan, Server, FileText } from 'lucide-react';
// Assuming 'Project' type is defined in '../types'
// If not, add: export type Project = { id: string; title: string; ...etc }
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Fire Detection System',
    description: 'Real-time fire detection system using computer vision and deep learning, capable of identifying fire incidents in surveillance footage.',
    image: 'CameraFire.png',
    category: 'Computer Vision',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'YOLO','SSD(Single Shot Detector)','Faster R-CNN'],
    githubUrl: 'https://github.com/Sedtha-019',
    liveUrl: 'fns.png'
  },
  {
    id: '2',
    title: 'Vehicle Counting', // <-- CHANGED
    description: 'Advanced vehicle counting system that categorizes and counts vehicles in real-time using deep learning models.', // <-- CHANGED
    image: 'counting.png',
    category: 'Machine Learning',
    technologies: ['Python', 'OpenCV', 'YOLO'],
    githubUrl: 'https://github.com/Sedtha-019',
    liveUrl: 'counting.png'
  },
  {
    id: '3',
    title: 'Face Recognition System',
    description: 'Facial recognition system with high accuracy, supporting multiple face detection and recognition in real-time.',
    image: 'Face1.png',
    category: 'AI',
    technologies: ['Python', 'FaceNet', 'Faster R-CNN', 'OpenCV'],
    githubUrl: 'https://github.com/Sedtha-019/face-detection-recognition-pytorch.git',
    liveUrl: '#'
  },
  {
    id: '4',
    title: 'Scalable ETL Pipeline (Thesis)',
    description: 'My thesis project: a scalable, end-to-end ETL pipeline designed to process large-scale cloud data using modern data engineering tools.',
    image: 'slide.png',
    category: 'Data Engineering',
    technologies: ['PySpark', 'Docker', 'Airflow', 'AWS S3', 'PostgreSQL'],
    githubUrl: 'https://github.com/Sedtha-019',
    liveUrl: 'etl.png'
  },
  {
    id: '5',
    title: 'Khmer Text Summarizer',
    description: 'A web-based tool for summarizing Khmer-language text, built using fine-tuned, state-of-the-art Transformer models. Team Project(Team Leader: MA OUSA)',
    image: 'khmerAI.png',
    category: 'NLP',
    technologies: ['PyTorch', 'Transformers', 'Hugging Face', 'Gradio', 'mBart50-large','LoRa Fine-tuning'],
    githubUrl: 'https://github.com/Sedtha-019/Khmer-Text-Summarization-.git',
    liveUrl: 'khmerAI.png'
  },
  {
    id: '6',
    title: 'Khmer Handwritten Character Recognition',
    description: 'Predicts handwritten Khmer characters from images using a custom CNN in PyTorch. The model classifies 10 Khmer letters with high accuracy.',
    image: 'khmer_alphabet_grey2.webp',
    category: 'Khmer OCR',
    technologies: ['PyTorch', 'CNN', 'OpenCV', 'Data Augmentation'],
    githubUrl: 'https://github.com/Sedtha-019/Khmer-Handwritten-Character-Recognition-Using-PyTorch.git',
    liveUrl: '#'
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  const defaultOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const getProjectIcon = (title: string) => {
    if (title.includes('Fire')) return Flame;
    if (title.includes('Vehicle')) return Car;
    if (title.includes('ETL')) return Server;
    if (title.includes('Summarizer')) return FileText;
    return Scan; // Default for Face Recognition
  };

  const Icon = getProjectIcon(project.title);

  // State and Effect for Image Animation
  const [currentImage, setCurrentImage] = useState(project.image);
  
  // --- CORRECTED SECTION ---
  // Combined the two declarations into one to avoid the redeclaration error
  const alternateImages = project.title === 'Face Recognition System'
    ? ['Face1.png', 'Face2.png']
    : project.title === 'Scalable ETL Pipeline (Thesis)'
      ? ['slide.png', 'etl.png']
      : [project.image];
      
  // --- END OF CORRECTION ---

  useEffect(() => {
    // Check if there are multiple images to alternate
    if (alternateImages.length > 1) {
      const interval = setInterval(() => {
        // Switch to the other image
        setCurrentImage((prevImage) =>
          prevImage === alternateImages[0] ? alternateImages[1] : alternateImages[0]
        );
      }, 3000); // Change image every 3 seconds
      
      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
    // Add alternateImages to the dependency array
  }, [alternateImages]);

  return (
    <Tilt options={defaultOptions}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transform-gpu"
      >
        <div className="relative h-48 overflow-hidden">
          <motion.img
            key={currentImage}
            src={currentImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
            <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <a
              href={project.githubUrl}
              className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.liveUrl}
              className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Computer Vision', 'Machine Learning', 'AI', 'Data Engineering', 'NLP'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
        >
          Featured Projects
        </motion.h2>

        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/3D'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;