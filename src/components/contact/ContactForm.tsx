"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingInput from "./FloatingInput";
import MagneticButton from "./MagneticButton";
import { 
  FaEnvelope, FaGithub, FaLinkedin, FaTwitter, 
  FaCheck, FaExclamationCircle 
} from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Reset form status after 5 seconds of success or error
  useEffect(() => {
    if (formStatus === "success" || formStatus === "error") {
      const timer = setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true,
      }));
    }
    
    // Validate in real-time if the field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Validate a single form field
  const validateField = (name: string, value: string) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else {
          delete newErrors.name;
        }
        break;
        
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
        
      case "subject":
        if (!value.trim()) {
          newErrors.subject = "Subject is required";
        } else if (value.trim().length < 3) {
          newErrors.subject = "Subject must be at least 3 characters";
        } else {
          delete newErrors.subject;
        }
        break;
        
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          newErrors.message = "Message must be at least 10 characters";
        } else {
          delete newErrors.message;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    
    setTouched(allTouched);
    
    // Validate form before submission
    const isValid = validateForm();
    
    if (!isValid) {
      return;
    }
    
    // Set form status to submitting
    setFormStatus("submitting");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log form data (replace with actual form submission)
      console.log("Form submitted:", formData);
      
      // Reset form data on success
      setFormData(initialFormData);
      setTouched({});
      setFormStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  // Reset the form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setFormStatus("idle");
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="contact">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a question or want to work together? Drop me a message, and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form */}
          <motion.div 
            className="lg:col-span-3 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm h-full">
              <h3 className="text-xl font-semibold mb-6">
                Send Me a Message
              </h3>
              
              {/* Status message */}
              <AnimatePresence mode="wait">
                {formStatus === "success" && (
                  <StatusMessage 
                    type="success"
                    icon={<FaCheck />} 
                    title="Message Sent!" 
                    message="Thank you for your message. I'll get back to you soon."
                    onClose={() => setFormStatus("idle")}
                  />
                )}
                
                {formStatus === "error" && (
                  <StatusMessage 
                    type="error"
                    icon={<FaExclamationCircle />} 
                    title="Oops! Something went wrong" 
                    message="There was an error sending your message. Please try again."
                    onClose={() => setFormStatus("idle")}
                  />
                )}
              </AnimatePresence>
              
              {/* Contact form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FloatingInput
                    id="name"
                    name="name"
                    type="text"
                    label="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  
                  <FloatingInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>
                
                <FloatingInput
                  id="subject"
                  name="subject"
                  type="text"
                  label="Subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
                
                <FloatingInput
                  id="message"
                  name="message"
                  type="text"
                  label="Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  textArea
                  rows={5}
                />
                
                <div className="flex justify-between items-center pt-2">
                  <motion.button
                    type="reset"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-lg border border-white/10 text-white font-medium text-sm hoverable opacity-80 hover:opacity-100"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className={`px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm hoverable flex items-center justify-center min-w-32 ${
                      formStatus === "submitting" ? "opacity-80" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formStatus === "submitting" ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <FaEnvelope className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
          
          {/* Contact info and socials */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-6">
                Connect With Me
              </h3>
              
              <p className="text-gray-300 mb-8">
                Feel free to reach out through the form or connect with me on social media. 
                I'm always open to discussing new projects, opportunities, or partnerships.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-4">
                    <FaEnvelope className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Email</h4>
                    <a href="mailto:contact@example.com" className="text-blue-400 hover:underline">
                      contact@example.com
                    </a>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-4 mt-auto">
                Social Profiles
              </h4>
              
              <div className="flex space-x-4">
                <MagneticButton 
                  href="https://github.com/abrar898" 
                  className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <FaGithub className="w-5 h-5" />
                </MagneticButton>
                
                <MagneticButton 
                  href="https://linkedin.com" 
                  className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <FaLinkedin className="w-5 h-5" />
                </MagneticButton>
                
                <MagneticButton 
                  href="https://twitter.com" 
                  className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <FaTwitter className="w-5 h-5" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Status message component
interface StatusMessageProps {
  type: "success" | "error";
  icon: React.ReactNode;
  title: string;
  message: string;
  onClose: () => void;
}

const StatusMessage = ({ type, icon, title, message, onClose }: StatusMessageProps) => {
  return (
    <motion.div
      className={`mb-6 p-4 rounded-lg ${
        type === "success" ? "bg-green-500/10" : "bg-red-500/10"
      } border ${
        type === "success" ? "border-green-500/30" : "border-red-500/30"
      }`}
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -20, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${
          type === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
        } flex items-center justify-center mr-3`}>
          {icon}
        </div>
        
        <div className="flex-1">
          <h4 className={`text-base font-medium ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}>
            {title}
          </h4>
          <p className="text-sm text-gray-300 mt-1">{message}</p>
        </div>
        
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default ContactForm; 