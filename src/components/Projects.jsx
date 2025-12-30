'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Importing Framer Motion

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

export default function Projects({ setSelectedProject,  }) {
  const projects = [

    {
      title: 'vers1ons',
      description: 'A community for musicians and visual artists',
      image: 'https://res.cloudinary.com/dyanabutler/image/upload/v1737496386/ARC-H1VE_LOGO_t1nsqj.png',
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

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setActiveIndex(activeIndex === index ? null : index); // Toggle the dropdown for the selected project
  };

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
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
              } 
              flex flex-col`}
            onClick={() => handleProjectClick(project, index)}
          >
            {/* Project Title */}
            <div className="flex justify-between items-center">
              <span className={`font-bold m-6 md:m-4 ${activeIndex === index ? 'md:text-black text-white' : ''}`}>
                {project.title}
              </span>
              <span className="mr-2">⚝</span>
            </div>

            {/* Mobile dropdown with slide-down animation */}
            <motion.div
              className="md:hidden overflow-hidden"
              initial="hidden"
              animate={activeIndex === index ? 'visible' : 'hidden'}
              variants={dropdownVariants}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {activeIndex === index && (
                <div className="p-4 bg-transparent rounded shadow">
                  {/* Image and Description */}
                  <div className="flex flex-col mb-6">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={imageVariants}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto rounded mb-4"
                        height="250"
                        width="250"
                        loading="eager"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENBLzMzLy0zPVBCR0JHMz1DcWl5VGR2h4iIl5eXqqqq+vr6////2wBDAR"
                      />
                    </motion.div>
                    <p className="text-muted-foreground font-plexmono">{project.description}</p>
                  </div>

                  {/* Services and Stack */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-base font-semibold font-orbitron mb-2 text-purple-200">Services</h3>
                      <ul className="list-inside space-y-1 font-plexmono text-sm">
                        {project.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold font-orbitron mb-2 text-purple-200">Stack</h3>
                      <ul className="list-inside space-y-1 font-plexmono text-sm">
                        {project.stack.map((tech, index) => (
                          <li key={index}>{tech}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* GitHub and Website Links */}
                  <div className="flex space-x-4 my-4 font-orbitron">
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-300 hover:underline"
                    >
                      <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
               <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z"/>
              </svg>
                      Website
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  );
}
