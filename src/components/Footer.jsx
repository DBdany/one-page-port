'use client';

const socialLinks = [
  { href: "https://github.com/DBdany", label: "GitHub", icon: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.49v-1.72c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.57 9.57 0 0112 6.81c.85.003 1.71.114 2.52.335 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.91.68 1.83v2.71c0 .28.16.59.67.49A10.012 10.012 0 0022 12c0-5.52-4.48-10-10-10z" },
  // { href: "", label: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8.3v.45c-3.2-.1-6.02-1.47-7.93-3.44A4.51 4.51 0 001 5.87v.06a4.5 4.5 0 002 4 4.47 4.47 0 01-2.05-.57v.06a4.48 4.48 0 003.6 4.39 4.52 4.52 0 01-2.04.08 4.5 4.5 0 004.18 3.1A9.03 9.03 0 011 18.1a12.68 12.68 0 006.88 2" },
  { href: "https://www.linkedin.com/in/dyanadany/", label: "LinkedIn", icon: "M16 8a6 6 0 00-6 6v5h2v-5a4 4 0 118 0v5h2v-5a6 6 0 00-6-6zM8 10H6V16H8V10zM7 8A1 1 0 107 6a1 1 0 000 2z" },
  // { href: "", label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  // { href: "", label: "YouTube", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
  // { href: "", label: "Email", icon: "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" },
  
];

const Footer = () => {
  return (
    <footer className="text-foreground w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:space-y-0 font-orbitron">
       
        {/* <div className="flex items-center">
          <a
            href="https://www.trustpilot.com/review/dyanabutler.com"
            target="_blank"
            className="transition duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 14L21 3"></path>
              <path d="M21 3v7"></path>
              <path d="M21 3h-7"></path>
              <path d="M14 10L3 21"></path>
              <path d="M3 21v-7"></path>
              <path d="M3 21h7"></path>
            </svg>
            TrustPilot Reviews
          </a>
        
        </div> */}
        

       {/* Right side: Copyright */}
       <div className="md:text-xs text-sm text-muted-foreground">
        <a href="/">
        <p>  &copy; Home </p>
        </a>
        </div>
       

      
        <div className="flex flex-wrap justify-center  md:pl-32">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              className="transition duration-300 hover:text-indigo-600 hover:indigo-600 md:text-sm flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="md:h-6 h-8 md:w-6 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
               
              >
                <path d={link.icon} />
              </svg>
              <span className="ml-2 hidden md:inline">{link.label}</span> {/* Text only visible on md and larger screens */}
            </a>
          ))}
        </div>

        
        <div className="flex items-center">
          <button
            className="transition duration-300 border rounded-sm p-2 px-4 hover:bg-indigo-600 md:text-sm"
          >
            my art →
          </button>
        
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
