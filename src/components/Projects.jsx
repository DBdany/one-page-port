'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

export default function Projects({ setSelectedProject }) {
  const projects = [

    {
      title: 'vers1ons',
      description: 'A community for musicians and visual artists',
      image: '/vers1ons.png',
      services: ['Web Development', 'Digital Art', 'Animation'],
      stack: ['Next.js', 'Procreate', 'Typescript', ],
      github: "https://github.com/your-project",
      website: "https://vers1ons.com",
      bgColor: '#000'
    },
    {
      title: 'Voice by iAccess Life',
      description: 'The tech-driven feedback solution for accessibility',
      image: '/voice.svg',
      services: ['UI/UX Design', 'Web Development', 'Branding'],
      stack: ['Next.JS', 'Webflow', 'CMS'],
      github: "https://github.com/your-project",
      website: "https://voice.iaccess.life",
      bgColor: '#000',
    },
    {
      title: 'Yarn Odyssey by NOVA',
      description: 'An online store showcasing Novas crochet creations.',
      image: 'https://res.cloudinary.com/dyanabutler/image/upload/v1728506646/yarn-odyssey-banner_nn85p7.png',
      services: ['Social Media', 'Marketing', 'Product Management'],
      stack: ['Instagram', 'Discord', `Google Ads`],
      github: "https://github.com/your-project",
      website: "https://www.instagram.com/yarn.odyssey",
      bgColor: '#000'
    },
    {
      title: 'WRLD CHNGRS',
      description: 'A unique NFT universe with a character builder feature',
      image: 'https://res.cloudinary.com/dyanabutler/image/upload/v1728506646/wrld-chngrs-banner_pphxde.png',
      services: ['UI/UX Design', 'Wireframing', 'Graphic Design'],
      stack: ['Figma', 'Digital Art', 'Adobe'],
      github: "https://github.com/",
      website: "https://wrld-chngrs.com",
      bgColor: '#000'
    },
    {
      title: 'mbianchini.art',
      description: 'A personal portfolio for a distinctive traditional mixed-media artist',
      image: 'https://res.cloudinary.com/dyanabutler/image/upload/v1728506645/mbianchini-banner_z5qklj.png',
      services: ['UI/UX Design', 'Web Development', 'Videographer'],
      stack: ['Next.js', 'Stripe Payments API'],
      github: "https://github.com/your-project",
      website: "https://mbianchini.art",
      bgColor: '#1a202c'
    },

    {
      title: 'dukemedia.co',
      description: 'A portfolio for a cool videographer, photographer, and filmmaker',
      image: 'https://res.cloudinary.com/dyanabutler/image/upload/v1728506644/duke-media-banner_ajdfxi.png',
      services: ['Website Development', 'UI/UX Design', 'Wireframing'],
      stack: ['Webflow', 'Figma', 'CMS'],
      github: "https://github.com/your-project",
      website: "https://duke-media-544a2a-00e5cb4d88917856f6b73.webflow.io/",
      bgColor: '#000'
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [mobileDrawerProject, setMobileDrawerProject] = useState(null);

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setActiveIndex(activeIndex === index ? null : index);
    // On mobile, open the drawer
    if (window.innerWidth < 768) {
      setMobileDrawerProject(mobileDrawerProject?.title === project.title ? null : project);
    }
  };

  const closeDrawer = () => {
    setMobileDrawerProject(null);
  };

  return (
    <section className="col-span-1 text-foreground shadow  pb-8 px-8 border-purple-200 h-full">
      <h2 className="text-xl font-semibold text-purple-200 font-orbitron m-4">Projects</h2>

      <ul>
        {projects.map((project, index) => (
          <li
            key={index}
            className={`cursor-pointer p-1 border-b border-purple-200 
              ${activeIndex === index 
                ? 'md:bg-muted-foreground md:text-black' 
                : 'hover:bg-black md:hover:bg-slate-900 '
              }`}
            onClick={() => handleProjectClick(project, index)}
          >
            <div className="flex justify-between items-center">
              <span className={`font-bold m-6 md:m-4 ${activeIndex === index ? 'md:text-black text-white' : ''}`}>
                {project.title}
              </span>
              <span className="mr-2">⚝</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile Bottom Sheet Drawer */}
      <AnimatePresence>
        {mobileDrawerProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            
            {/* Drawer */}
            <motion.div
              className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-purple-400 rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto custom-scrollbar"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Drag handle */}
              <div className="sticky top-0 bg-black pt-3 pb-2 flex justify-center">
                <div className="w-10 h-1 bg-purple-400/50 rounded-full" />
              </div>
              
              <div className="px-6 pb-8">
                {/* Header with close button */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold font-orbitron text-purple-200">
                    {mobileDrawerProject.title}
                  </h2>
                  <button 
                    onClick={closeDrawer}
                    className="text-white/60 hover:text-white p-2"
                  >
                    ✕
                  </button>
                </div>

                {/* Image */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={imageVariants}
                  className="mb-4"
                >
                  <Image
                    src={mobileDrawerProject.image}
                    alt={mobileDrawerProject.title}
                    className="w-full h-auto rounded"
                    height={500}
                    width={500}
                    loading="eager"
                  />
                </motion.div>

                {/* Description */}
                <p className="text-muted-foreground font-plexmono mb-6">
                  {mobileDrawerProject.description}
                </p>

                {/* Services and Stack */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-base font-semibold font-orbitron mb-2 text-purple-200">Services</h3>
                    <ul className="list-inside space-y-1 font-plexmono text-sm">
                      {mobileDrawerProject.services.map((service, i) => (
                        <li key={i}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-orbitron mb-2 text-purple-200">Stack</h3>
                    <ul className="list-inside space-y-1 font-plexmono text-sm">
                      {mobileDrawerProject.stack.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Website Link */}
                <a
                  href={mobileDrawerProject.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-orbitron border border-purple-400 rounded px-4 py-3 hover:bg-purple-600 transition-colors"
                >
                  view site →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
