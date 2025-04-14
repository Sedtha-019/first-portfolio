import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar } from 'lucide-react';
import type { Experience as ExperienceType } from '../types';

const experiences: ExperienceType[] = [
  {
    id: '1',
    company: 'UNESCO UNITWIN in Cambodia',
    role: 'Data Science Camp',
    duration: 'March 2023',
    description: [
      'Participated in and successfully completed the Standard level of the 2024 UNESCO UNITWIN Data Science Camp in Cambodia',
    'Gained practical experience and knowledge in cutting-edge data science techniques and methodologies'
    ]
  },
  {
    id: '2',
    company: 'ASEAN Data Science Explorers',
    role: 'SAP Analytics Cloud & SAP Build Apps Training',
    duration: 'Appril 2024',
    description: [
      'Participated in the 2024 Enablement Session focused on SAP Analytics Cloud (SAC) and SAP Build Apps',
      'Gained hands-on experience with data visualization, and no-code application development',
    ]
  }
];

const ExperienceCard = ({ experience }: { experience: ExperienceType }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 w-px h-full bg-emerald-200 dark:bg-emerald-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-600 dark:bg-emerald-400" />
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
            <p className="text-emerald-600 dark:text-emerald-400">{experience.company}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
          <Calendar className="w-4 h-4" />
          <span>{experience.duration}</span>
        </div>
        
        <ul className="space-y-2">
          {experience.description.map((item, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-400">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
        >
          Certification 
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;