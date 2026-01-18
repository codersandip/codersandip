import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sandiptahware18081998@gmail.com",
    href: "mailto:sandiptahware18081998@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7768056758",
    href: "tel:+917768056758",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="section-padding hero-section relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-hero-foreground"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-hero-foreground/70 text-lg"
          >
            Have a project in mind or looking for a skilled backend engineer?
            I'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-hero-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-hero-foreground/60">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-hero-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-hero-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-hero-foreground mb-4">
                Follow Me
              </h3>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-hero-foreground/70 hover:text-primary transition-all"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-hero-foreground/70 hover:text-primary transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>
            </div>

            {/* Download Resume */}
            <Button
              variant="outline"
              className="w-full border-primary/50 text-hero-foreground hover:bg-primary/10"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-card-foreground">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-card-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="subject" className="text-card-foreground">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message" className="text-card-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="bg-background/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-bg text-primary-foreground hover:opacity-90 h-12"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
