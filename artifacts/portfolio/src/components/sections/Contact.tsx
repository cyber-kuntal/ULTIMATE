import React, { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import { Mail, Phone, Linkedin, Github, Download, Send, Terminal, Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

const TO_EMAIL = 'kuntalkumar2007@gmail.com';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'success'>('idle');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] Message from ${name}`);
    const body    = encodeURIComponent(`Name:    ${name}\nEmail:   ${email}\n\n${message}`);
    window.open(`mailto:${TO_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    setFormState('success');
    setTimeout(() => {
      setFormState('idle');
      setName(''); setEmail(''); setMessage('');
    }, 4000);
  };

  const handleDownload = () => {
    window.open("https://drive.google.com/file/d/1lbpBzCpbVaHnxmWTD1e94O0uN-AdxbRn/view?usp=drive_link", "_blank");
  };

  const socials = [
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/kuntal-kumar-290730375/', value: 'in/kuntal-kumar' },
    { icon: Github, label: 'GitHub', url: 'https://github.com/cyber-kuntal', value: 'cyber-kuntal' },
    { icon: Mail, label: 'Email', url: 'mailto:kuntalkumar2007@gmail.com', value: 'kuntalkumar2007@gmail.com' },
    { icon: Phone, label: 'Phone', url: 'tel:+919875359296', value: '+91 9875359296' },
  ];

  return (
    <section id="contact" className="py-24 relative w-full z-10 bg-bg-deep border-t border-neon-primary/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionTitle title="Comms_Link" subtitle="Establish Secure Connection" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Terminal Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-0.5 rounded-none bg-neon-primary shadow-[0_0_15px_rgba(0,255,198,0.2)]">
              <div className="bg-bg-deep rounded-none h-full flex flex-col overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-[#031A18] border-b border-neon-primary px-4 py-3 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-none bg-neon-primary/40 border border-neon-primary" />
                    <div className="w-3 h-3 rounded-none bg-neon-soft/40 border border-neon-soft" />
                    <div className="w-3 h-3 rounded-none bg-neon-primary/80 border border-neon-primary shadow-[0_0_8px_rgba(0,255,198,1)]" />
                  </div>
                  <div className="font-mono text-xs text-neon-soft flex-1 text-center font-bold tracking-widest uppercase opacity-90">
                    root@kuntal-sys:~/contact/send_message.sh
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-8 flex-1 font-mono">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="flex items-center text-neon-primary text-sm mb-3">
                        <span className="mr-2 text-neon-soft">$</span> SET_VAR name=
                      </label>
                      <input 
                        type="text" required value={name} onChange={e => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-neon-primary/30 focus:border-neon-primary text-text-primary pb-2 outline-none transition-colors placeholder:text-text-muted/50 selection:bg-neon-primary selection:text-bg-deep"
                        placeholder='"Enter your designation"'
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-neon-primary text-sm mb-3">
                        <span className="mr-2 text-neon-soft">$</span> SET_VAR email=
                      </label>
                      <input 
                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-neon-primary/30 focus:border-neon-primary text-text-primary pb-2 outline-none transition-colors placeholder:text-text-muted/50 selection:bg-neon-primary selection:text-bg-deep"
                        placeholder='"Enter secure comms link"'
                      />
                    </div>

                    <div>
                      <label className="flex items-center text-neon-primary text-sm mb-3">
                        <span className="mr-2 text-neon-soft">$</span> SET_VAR payload=
                      </label>
                      <textarea 
                        required rows={4} value={message} onChange={e => setMessage(e.target.value)}
                        className="w-full bg-bg-mid border border-neon-primary/30 focus:border-neon-primary text-text-primary p-4 rounded-none outline-none transition-colors placeholder:text-text-muted/50 resize-none mt-2 selection:bg-neon-primary selection:text-bg-deep"
                        placeholder="Write your encrypted message here..."
                      />
                    </div>

                    <button 
                      type="submit" disabled={formState === 'success'}
                      className={`group relative overflow-hidden w-full py-5 flex items-center justify-center gap-3 font-bold tracking-widest uppercase transition-all duration-300 border ${
                        formState === 'idle'
                          ? 'bg-transparent border-neon-primary text-neon-primary hover:text-bg-deep hover:shadow-[0_0_20px_rgba(0,255,198,0.5)]'
                          : 'bg-neon-primary border-neon-primary text-bg-deep'
                      }`}
                    >
                      {formState === 'idle' && (
                        <div className="absolute inset-0 w-full h-full bg-neon-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      )}
                      
                      <div className="relative z-10 flex items-center gap-3">
                        {formState === 'idle' ? (
                          <>
                            <Terminal className="w-5 h-5" />
                            EXECUTE_SEND
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            TRANSMISSION_SUCCESSFUL
                          </>
                        )}
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Socials & Resume */}
          <div className="flex flex-col justify-center gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group flex flex-col p-6 bg-bg-card border border-neon-primary/20 rounded-none hover:border-neon-primary transition-colors duration-300 hover:bg-bg-mid"
                  >
                    <div className="w-12 h-12 rounded-none bg-bg-deep border border-neon-primary/30 flex items-center justify-center mb-4 group-hover:border-neon-primary group-hover:shadow-[0_0_15px_rgba(0,255,198,0.5)] transition-all">
                      <Icon className="w-6 h-6 text-neon-soft group-hover:text-neon-primary transition-colors" />
                    </div>
                    <h5 className="font-display font-bold text-text-primary text-lg mb-1">{social.label}</h5>
                    <p className="font-mono text-xs text-text-muted truncate group-hover:text-neon-primary transition-colors">
                      {social.value}
                    </p>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <GlowCard className="p-8 text-center border-neon-primary/50 group rounded-none bg-bg-card/80" onClick={handleDownload}>
                <div className="w-20 h-20 mx-auto rounded-none bg-bg-deep border border-neon-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,198,0.4)] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-neon-primary/10 group-hover:bg-neon-primary/20 transition-colors" />
                  <div className="relative group-hover:hidden"><Lock className="w-8 h-8 text-neon-soft" /></div>
                  <div className="relative hidden group-hover:block"><Unlock className="w-8 h-8 text-neon-primary" /></div>
                </div>
                <h4 className="text-2xl font-display font-bold text-text-primary mb-3">Classified Dossier</h4>
                <p className="text-text-muted font-sans mb-8 max-w-sm mx-auto">
                  Download full operational history and technical specifications (Resume).
                </p>
                <div className="inline-flex items-center gap-2 px-8 py-3 border border-neon-primary text-neon-primary font-mono text-sm uppercase tracking-widest group-hover:bg-neon-primary group-hover:text-bg-deep transition-all duration-300 font-bold shadow-[0_0_15px_rgba(0,255,198,0)] group-hover:shadow-[0_0_20px_rgba(0,255,198,0.5)]">
                  <Download className="w-4 h-4" /> Initiate Download
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
