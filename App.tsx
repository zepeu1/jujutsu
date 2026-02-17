import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Skull, Zap, Book, Users, X, Info, Menu, ChevronRight, Fingerprint, Flame } from 'lucide-react';
import { CHARACTERS, FACTIONS, WORLDVIEW } from './constants';
import { Character, FactionType } from './types';

// --- Utility Components ---

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'talisman' | 'curse';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-slate-800/80 border-slate-700 text-slate-300',
    talisman: 'bg-red-950/40 border-red-800/60 text-red-200 font-serif tracking-widest',
    curse: 'bg-purple-950/40 border-purple-800/60 text-purple-200',
  };

  return (
    <span className={`px-3 py-1 rounded-sm text-xs font-bold border backdrop-blur-sm ${styles[variant]} shadow-sm`}>
      {children}
    </span>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
  <div className="relative mb-12 text-center md:text-left">
    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500 tracking-tighter relative z-10">
      {children}
    </h2>
    <div className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-transparent hidden md:block" />
    <div className="absolute -top-6 -left-6 text-9xl font-black text-slate-800/20 select-none z-0 hidden md:block opacity-50 font-serif">
      呪
    </div>
  </div>
);

// --- Feature Components ---

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${character.id}`}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className="group relative bg-black border border-slate-800 hover:border-red-900/50 rounded-sm overflow-hidden cursor-pointer transition-all duration-500"
    >
      {/* Cursed Energy Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 group-hover:animate-pulse" />
      
      <div className="aspect-[16/9] overflow-hidden relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-90" />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-10 mix-blend-overlay"></div>

        <img
          src={`https://igx.kr/n/PM/${character.code}/1`}
          alt={character.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
          loading="lazy"
        />

        {/* Card Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            <div className="flex justify-between items-end mb-2 border-b border-white/10 pb-2">
                <h3 className="text-2xl font-bold text-slate-200 group-hover:text-red-500 transition-colors font-serif tracking-tight">{character.name}</h3>
                <span className={`text-sm font-bold font-mono tracking-widest ${character.grade === '특급' ? 'text-red-500' : 'text-slate-500'}`}>
                   [{character.grade}]
                </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1 italic font-light">{character.role || character.description}</p>
        </div>
        
        {/* Domain Indicator */}
        <div className="absolute top-0 right-0 z-20">
            {character.domainStatus === 'O' && (
                <div className="bg-red-600 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    Domain
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
};

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        <motion.div
            layoutId={`card-${character.id}`}
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-slate-800 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-red-900/50 text-slate-400 hover:text-white rounded-full transition-colors border border-slate-700 hover:border-red-500"
            >
                <X size={24} />
            </button>

            {/* Banner Image Section (16:9 like) */}
            <div className="w-full relative h-48 md:h-72 shrink-0 bg-black overflow-hidden group">
                <img
                    src={`https://igx.kr/n/PM/${character.code}/1`}
                    alt={character.name}
                    className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
                
                <div className="absolute bottom-6 left-6 md:left-10 z-20">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-2"
                    >
                         <span className={`px-2 py-0.5 text-[10px] border ${character.grade === '특급' ? 'border-red-600 text-red-500' : 'border-slate-600 text-slate-400'} uppercase tracking-[0.2em]`}>
                            Grade: {character.grade}
                         </span>
                         {character.role && <span className="text-slate-400 text-xs tracking-wider uppercase border-l border-slate-700 pl-3">{character.role}</span>}
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-white font-serif tracking-tighter"
                    >
                        {character.name}
                    </motion.h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full p-6 md:p-10 overflow-y-auto relative z-10">
                {/* Quote */}
                {character.quote && (
                    <div className="mb-10 relative">
                        <span className="absolute -top-4 -left-2 text-6xl text-slate-800 font-serif opacity-50">“</span>
                        <blockquote className="text-xl md:text-2xl text-slate-300 font-light italic text-center px-8 leading-relaxed">
                            {character.quote}
                        </blockquote>
                        <span className="absolute -bottom-8 -right-2 text-6xl text-slate-800 font-serif opacity-50">”</span>
                    </div>
                )}

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-px bg-slate-800/30 border border-slate-800 mb-10">
                    {[
                        { label: 'SEX', value: character.gender },
                        { label: 'AGE', value: character.age ? `${character.age}` : undefined },
                        { label: 'MBTI', value: character.mbti }
                    ].map((item, i) => item.value && (
                        <div key={i} className="p-4 text-center bg-[#0f0f0f]">
                            <span className="text-[10px] text-slate-500 block mb-1 tracking-widest">{item.label}</span>
                            <span className="text-sm font-bold text-slate-200">{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column: Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-red-500">
                             <Fingerprint size={16} />
                             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Profile Analysis</h3>
                        </div>
                        <p className="text-slate-400 leading-loose text-sm text-justify mb-6 border-l-2 border-slate-800 pl-4">
                            {character.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {character.keywords?.map(k => (
                                <Badge key={k} variant="default">{k}</Badge>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Abilities */}
                    <div className="space-y-6">
                        {/* Technique */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900 to-slate-900 rounded-sm opacity-50 blur opacity-20"></div>
                            <div className="relative bg-slate-900/40 border border-slate-800 p-5">
                                <h3 className="text-xs font-bold text-red-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                    <Flame size={14} /> Cursed Technique
                                </h3>
                                <p className="text-xl font-bold text-slate-100 font-serif">{character.technique}</p>
                            </div>
                        </div>
                        
                        {/* Domain */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-900 to-slate-900 rounded-sm opacity-50 blur opacity-20"></div>
                            <div className="relative bg-slate-900/40 border border-slate-800 p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Shield size={14} /> Domain Expansion
                                    </h3>
                                    {character.domainExpansion && (
                                        <div className="scale-75 origin-right">
                                            {character.domainStatus === 'O' && <Badge variant="talisman">DEPLOYABLE</Badge>}
                                            {character.domainStatus === '불완전' && <Badge variant="default">INCOMPLETE</Badge>}
                                            {character.domainStatus === 'X' && <span className="text-xs text-slate-600 font-mono">UNAVAILABLE</span>}
                                        </div>
                                    )}
                                </div>
                                {character.domainExpansion ? (
                                    <p className="text-xl font-bold text-slate-100 font-serif">{character.domainExpansion}</p>
                                ) : (
                                    <p className="text-slate-600 italic text-sm">No Domain Expansion recorded.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-800 flex justify-between items-center text-slate-600 font-mono text-[10px]">
                     <span>ARCHIVE ID: {character.id.toUpperCase()}</span>
                     <span>SECURE LEVEL: {character.grade === '특급' ? 'MAX' : 'STD'}</span>
                </div>
            </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Page Sections ---

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/80 to-black"></div>
             {/* Radial glow for effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-[5000ms]"></div>
        </div>

        {/* Content */}
        <div className="z-20 text-center px-4 max-w-5xl">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: "circOut" }}
            >
                <div className="mb-6 flex justify-center items-center gap-4 text-slate-500 tracking-[1em] font-bold text-xs uppercase opacity-70">
                    <span className="w-12 h-px bg-slate-700 inline-block"></span>
                    Confidential Archive
                    <span className="w-12 h-px bg-slate-700 inline-block"></span>
                </div>
                
                <h1 className="text-6xl md:text-9xl font-black text-slate-100 mb-2 leading-none tracking-tighter drop-shadow-2xl mix-blend-overlay opacity-90 font-serif">
                    K-JUJUTSU
                </h1>
                <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-500 to-purple-800 mb-10 leading-none tracking-tighter drop-shadow-2xl font-serif">
                    2040
                </h1>

                <p className="text-md md:text-lg text-slate-400 mb-12 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
                    The war between sorcerers and spirits continues in the shadows of modern Korea. 
                    <br/><span className="text-red-500/80">Access the restricted records.</span>
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onExplore}
                    className="group relative px-10 py-4 bg-[#0a0a0a] border border-red-900/50 text-red-500 font-bold text-sm tracking-[0.2em] uppercase overflow-hidden transition-all"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Initialize <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
            </motion.div>
        </div>
    </section>
  );
};

const WorldViewSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 relative">
       {/* Decorative Background Elements */}
       <div className="absolute top-20 right-0 text-[10rem] font-serif text-slate-900/50 select-none -z-10 pointer-events-none opacity-20">世界</div>

      <SectionHeading>WORLDVIEW</SectionHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORLDVIEW.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-[#0a0a0a] p-8 border border-slate-900 hover:border-slate-700 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Book size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-4 font-serif tracking-wide border-b border-slate-800 pb-2 inline-block">
              {item.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm font-light text-justify">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ArchiveSection: React.FC = () => {
    const [selectedFaction, setSelectedFaction] = useState<FactionType | 'ALL'>('ALL');
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const filteredCharacters = selectedFaction === 'ALL' 
        ? CHARACTERS 
        : CHARACTERS.filter(c => c.faction === selectedFaction);

    return (
        <div className="max-w-8xl mx-auto px-6 py-24 min-h-screen relative">
            <SectionHeading>ARCHIVE DATABASE</SectionHeading>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-12">
                <button
                    onClick={() => setSelectedFaction('ALL')}
                    className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all border ${
                        selectedFaction === 'ALL' 
                        ? 'bg-slate-100 text-black border-slate-100' 
                        : 'bg-transparent text-slate-500 border-slate-800 hover:border-slate-500 hover:text-slate-300'
                    }`}
                >
                    ALL RECORDS
                </button>
                {FACTIONS.map(faction => (
                    <button
                        key={faction.id}
                        onClick={() => setSelectedFaction(faction.id)}
                        className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all border flex items-center gap-2 ${
                            selectedFaction === faction.id
                            ? `${faction.color.replace('text-', 'border-').replace('400', '500')} bg-slate-900/50 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                            : 'bg-transparent text-slate-500 border-slate-800 hover:border-slate-500 hover:text-slate-300'
                        }`}
                    >
                       {faction.name}
                    </button>
                ))}
            </div>

            {/* Description of current faction */}
            {selectedFaction !== 'ALL' && (
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-10 p-6 bg-[#0a0a0a] border-l-2 border-slate-700 max-w-2xl"
                >
                    <h3 className="text-slate-200 font-bold mb-2 font-serif text-lg">
                        {FACTIONS.find(f => f.id === selectedFaction)?.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        {FACTIONS.find(f => f.id === selectedFaction)?.description}
                    </p>
                </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                <AnimatePresence mode="popLayout">
                    {filteredCharacters.map(char => (
                        <CharacterCard 
                            key={char.id} 
                            character={char} 
                            onClick={() => setSelectedCharacter(char)} 
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredCharacters.length === 0 && (
                <div className="text-center py-32 border border-dashed border-slate-900 rounded-lg">
                    <Info className="mx-auto mb-4 w-12 h-12 text-slate-800" />
                    <p className="text-slate-600 font-mono text-sm">No classified records found.</p>
                </div>
            )}

            {selectedCharacter && (
                <CharacterModal 
                    character={selectedCharacter} 
                    onClose={() => setSelectedCharacter(null)} 
                />
            )}
        </div>
    );
};

const Footer: React.FC = () => (
  <footer className="border-t border-slate-900 bg-black py-12 px-6 relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs tracking-wider">
        <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-bold text-slate-400 mb-1 uppercase">K-Jujutsu Archive 2040</p>
            <p className="font-mono">RESTRICTED ACCESS ONLY</p>
        </div>
        <div className="flex gap-8">
            <span className="hover:text-red-500 cursor-pointer transition-colors">PROTOCOL</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">SECURITY</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">CONTACT</span>
        </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'hero' | 'content'>('hero');

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-red-900/50 selection:text-white">
        {/* Global Grain/Noise Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
        
      <AnimatePresence mode="wait">
        {view === 'hero' ? (
           <motion.div key="hero" exit={{ opacity: 0, filter: 'blur(20px)' }} transition={{ duration: 0.8 }}>
             <Hero onExplore={() => setView('content')} />
           </motion.div>
        ) : (
           <motion.div 
             key="content" 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8 }}
           >
              {/* Sticky Nav */}
              <nav className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-white/5">
                  <div className="max-w-8xl mx-auto px-6 h-16 flex items-center justify-between">
                      <div className="font-bold tracking-widest text-slate-200 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setView('hero')}>
                        K-JUJUTSU <span className="text-red-600">2040</span>
                      </div>
                      <div className="flex gap-4 text-xs font-bold tracking-widest">
                          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-500 hover:text-white transition-colors">SYSTEM_TOP</button>
                      </div>
                  </div>
              </nav>

              <main>
                  <WorldViewSection />
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900/30 to-transparent my-10" />
                  <ArchiveSection />
              </main>

              <Footer />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}