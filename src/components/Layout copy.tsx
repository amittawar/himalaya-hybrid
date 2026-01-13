import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Languages, Facebook, Youtube, Instagram, Linkedin, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Layout: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen flex flex-col font-oswald tracking-wide bg-white">
      {/* Top Utility Bar */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-1 px-4 flex justify-end items-center gap-2 relative z-[60]">
        <div className="flex items-center gap-2 text-[#2d5a27] font-sans text-xs font-semibold">
          <Languages size={14} />
          <span>Language:</span>
        </div>
        <select
          className="bg-transparent border-none rounded p-1 text-xs font-sans focus:ring-0 text-gray-700 cursor-pointer hover:text-[#2d5a27] transition-colors"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#2d5a27] rounded-full flex items-center justify-center text-white font-bold text-xl italic border-2 border-[#8cc63f]">H</div>
            <div className="leading-none">
              <span className="text-[#2d5a27] font-bold text-xl block tracking-tighter">HIMALAYA</span>
              <span className="text-[#8cc63f] text-xs font-sans font-bold block uppercase tracking-tight">Hybrid Seeds</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} className="text-[#2d5a27]" /> : <Menu size={28} className="text-[#2d5a27]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 animate-slide-up shadow-2xl">
          <ul className="space-y-6 text-2xl font-medium text-[#2d5a27]">
            <li className="border-b border-gray-100 pb-2 cursor-pointer" onClick={() => { setIsMenuOpen(false); navigate('/'); }}>{t.home}</li>
            {/* <li className="border-b border-gray-100 pb-2" onClick={() => setIsMenuOpen(false)}>{t.aboutUs}</li> */}
            <li className="border-b border-gray-100 pb-2">
              <a
                href="assets/pdf/Himalya_Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.aboutUs}
              </a>
            </li>


          </ul>
        </div>
      )}

      {/* Main Content */}
      <Outlet />

      {/* Transition Silhouette */}
      <div className="relative h-20 bg-gray-50 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full text-[#2d5a27]" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,100 L1440,100 L1440,0 C1300,80 1100,20 900,60 C700,100 500,20 300,80 C150,110 0,60 0,60 Z"></path>
        </svg>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#2d5a27] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter text-[#8cc63f]">{t.contactUs}</h2>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <MapPin className="shrink-0 mt-1 text-[#8cc63f]" size={24} />
                <div>
                  <p className="font-bold">Himalaya Hybrid Seeds Company</p>
                  <p className="font-sans text-sm opacity-90 leading-snug">
                    1364, SEC-38, PHASE-1,<br />INDUSTRIAL ESTATE, HSIIDC,<br />RAI, (Dist. Sonipat) HARYANA - 131029
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Phone className="shrink-0 text-[#8cc63f]" size={24} />
                <p className="font-sans text-lg">+91-9873640440</p>
              </div>

              <div className="flex gap-4 items-center">
                <Mail className="shrink-0 text-[#8cc63f]" size={24} />
                <p className="font-sans text-sm break-all">Himalayaseeds88@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3">
              <FooterLink onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>{t.home}</FooterLink>
              <FooterLink><Link to="assets/pdf/Himalya_Catalogue.pdf" target="_blank">{t.aboutUs}</Link></FooterLink>
            </div>
          </div>

          {/* Social and Language */}
          <div className="flex flex-col items-center md:items-start">
            {/* <div className="flex gap-4 mb-8">
              <SocialIcon><Facebook size={24} /></SocialIcon>
              <SocialIcon><Youtube size={24} /></SocialIcon>
              <SocialIcon><Instagram size={24} /></SocialIcon>
              <SocialIcon><Linkedin size={24} /></SocialIcon>
            </div> */}
            <p className="font-sans text-sm text-center md:text-left mb-4 opacity-90">{t.allRightsReserved}</p>
            <div className="text-[#8cc63f]/40 text-xs font-sans tracking-widest uppercase">
              HIMALAYA™ HYBRID SEEDS
            </div>
          </div>
        </div>

        {/* Scroll Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-[#8cc63f] p-4 rounded-full shadow-lg text-[#2d5a27] hover:scale-110 transition-transform z-50 border-2 border-white/30"
          aria-label="Scroll to top"
        >
          <ChevronRight size={24} className="-rotate-90" />
        </button>
      </footer>
    </div>
  );
};

const FooterLink: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) => (
  <button onClick={onClick} className="block text-left hover:translate-x-1 transition-transform opacity-90 hover:opacity-100 text-lg hover:text-[#8cc63f] font-light font-oswald uppercase">
    {children}
  </button>
);

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-[#8cc63f] hover:text-[#2d5a27] transition-all">
    {children}
  </a>
);

export default Layout;
