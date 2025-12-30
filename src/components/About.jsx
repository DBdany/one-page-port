'use client';
import Image from 'next/image';
import Guestbook from './Guestbook';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

const socialLinks = [
  { href: "https://github.com/DBdany", label: "GitHub", icon: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.72c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0112 6.81c.85.003 1.71.114 2.52.335 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.91.68 1.83v2.71c0 .28.16.59.67.49A10.012 10.012 0 0022 12c0-5.52-4.48-10-10-10z" },
  { href: "https://youtube.com/@DBdany", label: "YouTube", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
];

export default function About() {
  return (
    <>
    <section className="col-span-1 pb-8 px-8 pt-4 min-h-fit md:h-full text-foreground shadow border-l border-white/10 md:overflow-y-auto">
      <h2 className="text-xl font-semibold font-orbitron mb-2 text-purple-200">About</h2>

      {/* Flex container to align image and text side by side */}
      <div className="flex items-start">
        {/* Image as an icon */}
        <Image
          src="/biopic2.png"
          alt="biopic"
          className="h-20 w-20 rounded-sm mr-4"
          height="250"
          width="250"
        />

        {/* Text next to the image */}
        <p className='font-plexmono text-sm'>Dany is a full stack software developer specialized in UI/UX systems<br/></p>
      </div>

      {/* Social Links & My Art Button */}
      <div className="flex items-center gap-4 mt-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
            title={link.label}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d={link.icon} />
            </svg>
          </a>
        ))}
        <button className="ml-auto text-sm font-orbitron border border-purple-400 rounded px-3 py-1 hover:bg-purple-600 transition-colors">
          my art →
        </button>
      </div>

      {/* Accordion for Services and Guestbook */}
      <Accordion type="multiple" defaultValue={["guestbook"]} className="mt-6">
        {/* Services - default closed */}
        <AccordionItem value="services" className="border-white/10">
          <AccordionTrigger className="text-base font-semibold font-orbitron text-purple-200 py-2 hover:no-underline">
            Services
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-inside font-plexmono text-sm space-y-2">
              <li>Website Creation & Deployment</li>
              <li>Graphic Design & Wireframing</li>
              <li>Art Direction & Illustration</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Guestbook - default open */}
        <AccordionItem value="guestbook" className="border-white/10">
          <AccordionTrigger className="text-base font-semibold font-orbitron text-purple-200 py-2 hover:no-underline">
            Guestbook
          </AccordionTrigger>
          <AccordionContent>
            <Guestbook hideTitle />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
     
    </section>
    
    </>
  );
}
