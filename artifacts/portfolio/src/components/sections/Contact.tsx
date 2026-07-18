import React, { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import GlowCard from '@/components/ui/GlowCard';
import { Mail, Phone, Linkedin, Github, Download, Send, Terminal } from 'lucide-react';
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
    const body    = encodeURIComponent(
      `Name:    ${name}\nEmail:   ${email}\n\n${message}`
    );
    // Opens the visitor's email client with fields pre-filled
    window.open(`mailto:${TO_EMAIL}?subject=${subject}&body=${body}`, '_blank');

    setFormState('success');
    // Reset after 4 s
    setTimeout(() => {
      setFormState('idle');
      setName('');
      setEmail('');
      setMessage('');
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
    <section id="contact" className="py-24 relative w-full z-10 bg-bg-secondary border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionTitle title="Comms_Link" subtitle="Establish Secure Connection" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Terminal Contact Form */}
          <GlowCard className="p-1 rounded-md bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-bg-primary rounded-sm h-full flex flex-col overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-bg-card border-b border-white/10 px-4 py-2 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                  <div className="w-3 h-3 rounded-full bg-cyber-green/80" />
                </div>
                <div className="font-mono text-xs text-text-muted flex-1 text-center font-medium opacity-80">
                  root@kuntal-sys:~/contact/send_message.sh
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 md:p-8 flex-1 font-mono">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center text-cyber-cyan text-sm mb-2">
                      <span className="mr-2 text-text-muted">$</span> SET_VAR name=
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-border/50 focus:border-cyber-cyan text-white pb-2 outline-none transition-colors placeholder:text-text-muted/30"
                      placeholder='"Enter your name"'
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-cyber-cyan text-sm mb-2">
                      <span className="mr-2 text-text-muted">$</span> SET_VAR email=
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-border/50 focus:border-cyber-cyan text-white pb-2 outline-none transition-colors placeholder:text-text-muted/30"
                      placeholder='"Enter your email"'
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-cyber-cyan text-sm mb-2">
                      <span className="mr-2 text-text-muted">$</span> SET_VAR payload=
                    </label>
                    <textarea 
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-bg-card/50 border border-border/50 focus:border-cyber-cyan text-white p-3 rounded-sm outline-none transition-colors placeholder:text-text-muted/30 resize-none mt-2"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'success'}
                    className={`w-full py-4 flex items-center justify-center gap-3 font-bold tracking-widest uppercase transition-all duration-300 border ${
                      formState === 'idle'
                        ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-bg-primary hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                        : 'bg-cyber-green border-cyber-green text-bg-primary'
                    }`}
                  >
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
                  </button>
                </form>
              </div>
            </div>
          </GlowCard>

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
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col p-6 bg-bg-card border border-border/30 rounded-lg hover:border-cyber-green transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-bg-primary border border-white/10 flex items-center justify-center mb-4 group-hover:border-cyber-green group-hover:shadow-[0_0_10px_rgba(0,255,135,0.4)] transition-all">
                      <Icon className="w-5 h-5 text-text-muted group-hover:text-cyber-green transition-colors" />
                    </div>
                    <h5 className="font-display font-bold text-white text-lg mb-1">{social.label}</h5>
                    <p className="font-mono text-xs text-text-muted truncate group-hover:text-white/80 transition-colors">
                      {social.value}
                    </p>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <GlowCard className="p-8 text-center" onClick={handleDownload}>
                <div className="w-16 h-16 mx-auto rounded-full bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Download className="w-8 h-8 text-cyber-green" />
                </div>
                <h4 className="text-2xl font-display font-bold text-white mb-2">Classified Dossier</h4>
                <p className="text-text-muted font-sans mb-6 max-w-sm mx-auto">
                  Download full operational history and technical specifications (Resume).
                </p>
                <div className="inline-block px-6 py-2 border border-cyber-green text-cyber-green font-mono text-sm uppercase tracking-widest group-hover:bg-cyber-green group-hover:text-bg-primary transition-colors">
                  Initiate Download
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}