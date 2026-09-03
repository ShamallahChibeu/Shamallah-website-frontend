import { MessageCircle, Phone, Mail } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[340px] px-6 py-16 md:px-12 lg:px-16 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-paper mb-1">Shamalah Blessing Chibeu</h1>
        <h2 className="text-sm text-paper/80 mb-4">Machine learning / full-stack engineer</h2>
        <p className="text-sm text-muted leading-relaxed max-w-xs mb-10">
          I build intelligent, scalable solutions with machine learning and modern web technologies. I turn ideas and data into powerful digital experiences that solve real-world problems.
        </p>
        <ul className="hidden lg:block space-y-4 text-xs tracking-widest font-semibold text-paper/70 mb-10">
          <li><a href="#about" className="hover:text-signal transition-colors">ABOUT</a></li>
          <li><a href="#experience" className="hover:text-signal transition-colors">EXPERIENCE</a></li>
          <li><a href="#projects" className="hover:text-signal transition-colors">PROJECTS</a></li>
          <li><a href="#writing" className="hover:text-signal transition-colors">WRITING</a></li>
          <li><a href="#contact" className="hover:text-signal transition-colors">CONTACT</a></li>
        </ul>
      </div>
      <div className="flex gap-4 text-muted">
        <a href="https://github.com/ShamallahChibeu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-signal transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg></a>
        <a href="https://linkedin.com/in/blessing-chibeu-5353a7419" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-signal transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
        <a href="https://wa.me/254707351238" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-signal transition-colors"><MessageCircle size={20} /></a>
        <a href="tel:+254707351238" aria-label="Call" className="hover:text-signal transition-colors"><Phone size={20} /></a>
        <a href="mailto:shamallah.chibeu@gmail.com" aria-label="Email" className="hover:text-signal transition-colors"><Mail size={20} /></a>
        <a href="https://www.instagram.com/_s.h.a.m.allah" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-signal transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.55.55.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.21-1.15 1.76-.55.55-1.1.9-1.76 1.15-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47-.66-.26-1.21-.6-1.76-1.15-.55-.55-.9-1.1-1.15-1.76-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76.55-.55 1.1-.9 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.95 2.01 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/></svg></a>
      </div>
    </aside>
  );
}
