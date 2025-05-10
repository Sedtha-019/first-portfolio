import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Database, Cpu } from 'lucide-react';
import type { Skill } from '../types';

const skills: Skill[] = [
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'C++', level: 60, category: 'programming' },
  { name: 'Java', level: 50, category: 'programming' },
  { name: 'TensorFlow', level: 75, category: 'ai' },
  { name: 'PyTorch', level: 80, category: 'ai' },
  { name: 'OpenCV', level: 80, category: 'ai' },
  { name: 'Scikit-learn', level: 80, category: 'ai' },
  { name: 'SQL', level: 70, category: 'data' },
  { name: 'Pandas', level: 90, category: 'data' },
  { name: 'Numpy', level: 90, category: 'data' },
  { name: 'Matplotlib', level: 90, category: 'data' },
  { name: 'Pyplot', level: 80, category: 'data' },
  { name: 'Seaborn', level: 60, category: 'data' },
  // { name: 'Arduino', level: 60, category: 'iot' },
  // { name: 'Raspberry Pi', level: 80, category: 'iot' },
];

const SkillCard = ({ skill }: { skill: Skill }) => {
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
      className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{skill.name}</h3>
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
        />
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400 mt-2 block">{skill.level}%</span>
    </motion.div>
  );
};

const Skills = () => {
  const categories = [
    { name: 'Programming', icon: Code, skills: skills.filter(s => s.category === 'programming') },
    { name: 'AI & ML', icon: Brain, skills: skills.filter(s => s.category === 'ai') },
    { name: 'Data Science', icon: Database, skills: skills.filter(s => s.category === 'data') },
    // { name: 'IoT', icon: Cpu, skills: skills.filter(s => s.category === 'iot') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16"
        >
          Technical Skills
        </motion.h2>

        <div className="space-y-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <category.icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;