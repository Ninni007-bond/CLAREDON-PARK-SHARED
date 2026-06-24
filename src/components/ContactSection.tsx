import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-secondary">
      <div className="container-main px-5 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeUp}
        >
          <p className="eyebrow text-brand-limestone/60 mb-3 sm:mb-4 text-[10px] sm:text-xs">Contact</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-brand-limestone mb-4 sm:mb-6">
            Get In Touch
          </h2>
          <p className="font-body text-brand-limestone/50 tracking-wide max-w-lg mx-auto text-sm leading-relaxed">
            Whether you'd like to arrange a private viewing or simply learn more
            about Clarendon Park, our team is here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col justify-center order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            variants={fadeUp}
          >
            <div className="space-y-6 sm:space-y-8">
              {[
                 { icon: Phone, label: "Telephone", value: "01962 678528" },
                { icon: Mail, label: "Email", value: "sales@shorewoodhomes.co.uk" },
                { icon: Clock, label: "Viewing Hours", value: "By appointment only" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 sm:gap-4">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-limestone/40 mt-0.5 flex-shrink-0" strokeWidth={1.2} />
                  <div>
                    <p className="font-body text-[10px] sm:text-xs text-brand-limestone/40 uppercase tracking-[0.15em] mb-0.5 sm:mb-1">{item.label}</p>
                    <p className="font-body text-xs sm:text-sm text-brand-limestone/70 tracking-wide break-all sm:break-normal">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12">
              <div className="w-10 sm:w-12 h-px bg-brand-limestone/20 mb-4 sm:mb-6" />
              <p className="font-body text-[10px] sm:text-xs text-brand-limestone/30 tracking-wide leading-relaxed">
                Shorewood Homes Ltd<br />
                Registered in England & Wales
              </p>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            variants={fadeUp}
          >
            {submitted ? (
              <div className="py-12 sm:py-16 text-center">
                <p className="font-display text-xl sm:text-2xl text-brand-limestone mb-2">Thank You</p>
                <p className="font-body text-brand-limestone/50 tracking-wide text-sm">We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <input type="text" placeholder="First Name" required className="w-full bg-transparent border border-brand-limestone/15 px-4 py-3 font-body text-sm text-brand-limestone placeholder:text-brand-limestone/25 tracking-wide focus:outline-none focus:border-brand-limestone/40 transition-colors duration-300" />
                  <input type="text" placeholder="Last Name" required className="w-full bg-transparent border border-brand-limestone/15 px-4 py-3 font-body text-sm text-brand-limestone placeholder:text-brand-limestone/25 tracking-wide focus:outline-none focus:border-brand-limestone/40 transition-colors duration-300" />
                </div>
                <input type="email" placeholder="Email Address" required className="w-full bg-transparent border border-brand-limestone/15 px-4 py-3 font-body text-sm text-brand-limestone placeholder:text-brand-limestone/25 tracking-wide focus:outline-none focus:border-brand-limestone/40 transition-colors duration-300" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border border-brand-limestone/15 px-4 py-3 font-body text-sm text-brand-limestone placeholder:text-brand-limestone/25 tracking-wide focus:outline-none focus:border-brand-limestone/40 transition-colors duration-300" />
                <textarea placeholder="Your Message" rows={4} className="w-full bg-transparent border border-brand-limestone/15 px-4 py-3 font-body text-sm text-brand-limestone placeholder:text-brand-limestone/25 tracking-wide focus:outline-none focus:border-brand-limestone/40 transition-colors duration-300 resize-none" />
                <div className="pt-1 sm:pt-2">
                  <button type="submit" className="btn-outline-gold border-brand-limestone/30 text-brand-limestone hover:bg-brand-limestone/10 w-full text-xs">
                    Send Enquiry
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
