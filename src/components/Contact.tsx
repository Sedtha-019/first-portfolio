import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Facebook, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send('service_visqzfn', 'template_99e3847', formData, 'lA2ABbvQQlDkyiFI2')
      .then(() => { setStatus('sent'); setFormData({ name: '', email: '', message: '' }); })
      .catch(() => setStatus('error'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const INFO = [
    { icon: Mail, label: 'Email', value: 'sedthamao19data@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+855 (10) 273-060' },
    { icon: MapPin, label: 'Location', value: 'Phnom Penh, Cambodia' },
  ];

  const SOCIALS = [
    { icon: Github, href: 'https://github.com/Sedtha-019', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://www.facebook.com/Sedtha019?mibextid=ZbWKwL', label: 'Facebook' },
  ];

  return (
    <div className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gradient inline-block mb-3">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg">Open to opportunities, collaborations, and conversations.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="glass-card rounded-2xl p-7 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
            <h3 className="font-heading text-lg font-bold text-foreground mb-6 relative z-10">Contact Information</h3>

            <div className="space-y-5 mb-8 relative z-10">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 relative z-10">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card rounded-2xl p-7 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
            <h3 className="font-heading text-lg font-bold text-foreground mb-6 relative z-10">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {[
                { id: 'name', label: 'Name', type: 'text' },
                { id: 'email', label: 'Email', type: 'email' },
              ].map(({ id, label, type }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-heading font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                    {label}
                  </label>
                  <input type={type} id={id} name={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleChange} required
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none text-sm text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-xs font-heading font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea id="message" name="message" rows={5}
                  value={formData.message} onChange={handleChange} required
                  className="w-full px-4 py-2.5 rounded-xl bg-muted/40 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 outline-none text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none"
                />
              </div>
              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-heading font-bold bg-primary text-primary-foreground hover:opacity-90 glow-primary hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50">
                {status === 'sending' ? 'Sending…' : (<><Send className="w-4 h-4" /> Send Message</>)}
              </button>
              {status === 'sent' && <p className="text-sm text-emerald-400 text-center">Message sent successfully!</p>}
              {status === 'error' && <p className="text-sm text-rose-400 text-center">Failed to send. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
