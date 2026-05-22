import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Home, CheckCircle2, ChevronRight, 
  Clock, FileText, Leaf
} from 'lucide-react';
// import { db } from '../lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type ServiceBookingData = {
  city: string;
  propertyType: string;
  date: string;
  timeSlot: string;
  pincode: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
};

interface ServiceBookingProps {
  onSuccess?: (data: ServiceBookingData) => void;
  price?: number;
  currencySymbol?: string;
  className?: string;
}

const CITIES = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Bangalore",
  "Pune"
];

const PROPERTY_TYPES = [
  "Terrace/Rooftop",
  "Balcony",
  "Villa / Independent House",
  "Office Workspace",
  "Commercial Complex",
  "Residential Complex"
];

const TIME_SLOTS = [
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM"
];

export default function ServiceBooking({ 
  onSuccess, 
  price = 499, 
  currencySymbol = "₹",
  className = ""
}: ServiceBookingProps) {
  const [formData, setFormData] = useState<ServiceBookingData>({
    city: '',
    propertyType: '',
    date: '',
    timeSlot: '',
    pincode: '',
    notes: '',
    name: '',
    phone: '',
    email: ''
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCitySelect = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
  };

  const isStep1Valid = formData.city !== '' && formData.propertyType !== '';
  const isStep2Valid = formData.date !== '' && formData.timeSlot !== '';
  const isStep3Valid = formData.name !== '' && formData.phone.length >= 10 && formData.pincode !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && isStep1Valid) {
      setStep(2);
      return;
    }
    if (step === 2 && isStep2Valid) {
      setStep(3);
      return;
    }
    if (step === 3 && isStep3Valid) {
      setIsSubmitting(true);
      
      try {
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          propertyType: formData.propertyType,
          date: formData.date,
          timeSlot: formData.timeSlot,
          pincode: formData.pincode,
          notes: formData.notes,
          service: 'Expert Landscape Consultation',
          status: 'booked',
          createdAt: new Date().toISOString()
        };

        const googleSheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;

        if (googleSheetUrl) {
          await fetch(googleSheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        } else {
          console.warn('VITE_GOOGLE_SHEET_URL is not defined in the environment. Form submission skipped.');
          
          /*
          // Future Firebase Implementation:
          await addDoc(collection(db, 'service_bookings'), payload);
          */
        }
        
        setIsSubmitting(false);
        setIsSuccess(true);
        if (onSuccess) {
          onSuccess(formData);
        }
      } catch (error) {
        console.error('Error submitting form', error);
        setIsSubmitting(false);
      }
    }
  };

  // Get minimum date for date picker (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (isSuccess) {
    return (
      <div className={`bg-surface-container-lowest p-8 rounded-[2rem] ambient-shadow border border-surface-container-low text-center max-w-lg mx-auto ${className}`}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 strokeWidth={1.5} className="w-10 h-10 text-primary" />
          </div>
        </motion.div>
        <h3 className="text-3xl font-display font-medium text-on-surface mb-3">Booking Confirmed</h3>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto text-[15px] leading-relaxed">
          Thank you, <span className="font-semibold text-on-surface">{formData.name.split(' ')[0]}</span>! Our experts will visit you on <span className="font-semibold text-on-surface">{new Date(formData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span> between <span className="font-semibold text-on-surface">{formData.timeSlot}</span>.
        </p>
        <div className="bg-surface-container-low/50 p-6 rounded-2xl text-left border border-surface-container-low mb-8 space-y-4">
          <div className="flex justify-between text-sm items-center border-b border-surface-container-highest/30 pb-3">
            <span className="text-on-surface-variant font-medium">Service</span>
            <span className="font-semibold text-on-surface text-right">Expert Landscape Consultation</span>
          </div>
          <div className="flex justify-between text-sm items-center border-b border-surface-container-highest/30 pb-3">
            <span className="text-on-surface-variant font-medium">Location</span>
            <span className="font-semibold text-on-surface text-right">{formData.city}</span>
          </div>
          <div className="flex justify-between text-sm items-center pt-1">
            <span className="text-on-surface-variant font-medium">Total Paid</span>
            <span className="font-bold text-primary text-xl">{currencySymbol}{price}</span>
          </div>
        </div>
        <button 
          onClick={() => {
            setStep(1);
            setIsSuccess(false);
            setFormData({ city: '', propertyType: '', date: '', timeSlot: '', pincode: '', notes: '', name: '', phone: '', email: '' });
          }}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-[3.25rem] rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Book Another Service
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-surface-container-lowest rounded-[2rem] ambient-shadow overflow-hidden flex flex-col max-w-lg mx-auto ${className}`}>
      {/* Header */}
      <div className="bg-surface-container-low/50 p-6 md:p-8 border-b border-surface-container-highest/50">
        <h2 className="text-3xl font-display font-medium text-on-surface flex items-center gap-3">
          <Leaf className="w-7 h-7 text-primary" />
          Expert Landscape Consultation
        </h2>
        <div className="flex items-center space-x-3 mt-4">
          <span className="text-2xl font-bold text-primary">{currencySymbol}{price}</span>
          <span className="text-sm text-on-surface-variant line-through">{currencySymbol}999</span>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">50% OFF</span>
        </div>
        <p className="text-sm text-on-surface-variant mt-4 leading-relaxed font-sans">
          Get precise measurements and personalized landscaping and styling advice from our experts right at your property.
        </p>
        
        {/* Step Indicator */}
        <div className="flex items-center space-x-2 mt-8">
          <div className="flex-1 h-1.5 rounded-full bg-primary transition-all duration-500"></div>
          <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? "bg-primary" : "bg-surface-container-highest"}`}></div>
          <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${step >= 3 ? "bg-primary" : "bg-surface-container-highest"}`}></div>
        </div>
        <div className="flex justify-between mt-3 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50">
          <span className="text-primary">Location</span>
          <span className={step >= 2 ? "text-primary transition-colors duration-500" : ""}>Schedule</span>
          <span className={step >= 3 ? "text-primary transition-colors duration-500" : ""}>Details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col flex-1 relative min-h-[460px] bg-surface-container-lowest">
        <AnimatePresence mode="wait">
          {/* STEP 1: LOCATION & PROPERTY */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="space-y-8 flex-1 flex flex-col justify-center"
            >
              <div className="space-y-4">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Select your city
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CITIES.map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className={`py-3.5 px-3 text-[13px] rounded-xl border text-center transition-all font-semibold ${
                        formData.city === city 
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]" 
                          : "border-surface-container-highest bg-surface-container-lowest text-on-surface hover:border-primary/40 hover:bg-surface-container-low"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center">
                  <Home className="w-4 h-4 mr-2 text-primary" />
                  Property Type
                </label>
                <div className="relative group">
                  <select 
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-surface-container-lowest border border-surface-container-highest rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:ring-0 focus:border-primary transition-all text-on-surface group-hover:border-primary/50"
                  >
                    <option value="" disabled>Select property type</option>
                    {PROPERTY_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="space-y-8 flex-1 flex flex-col justify-center"
            >
              <div className="space-y-4">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Preferred Date
                </label>
                <input 
                  type="date" 
                  name="date"
                  min={minDate}
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container-lowest border border-surface-container-highest rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:ring-0 focus:border-primary transition-all text-on-surface hover:border-primary/50"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-on-surface uppercase tracking-widest flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                      className={`py-4 px-4 text-sm rounded-xl border text-center transition-all font-semibold ${
                        formData.timeSlot === slot 
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]" 
                          : "border-surface-container-highest bg-surface-container-lowest text-on-surface hover:border-primary/40 hover:bg-surface-container-low"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: USER DETAILS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="space-y-6 flex-1 flex flex-col justify-center"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary rounded-xl px-4 py-3.5 text-sm focus:scale-[1.02] focus:shadow-md focus:shadow-primary/5 focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary rounded-xl px-4 py-3.5 text-sm focus:scale-[1.02] focus:shadow-md focus:shadow-primary/5 focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Email (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary rounded-xl px-4 py-3.5 text-sm focus:scale-[1.02] focus:shadow-md focus:shadow-primary/5 focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="560001"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary rounded-xl px-4 py-3.5 text-sm focus:scale-[1.02] focus:shadow-md focus:shadow-primary/5 focus:outline-none transition-all placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest flex items-center">
                  <FileText className="w-3 h-3 mr-1.5" />
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  placeholder="Specific requirements or a complete address..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-surface-container-lowest border border-surface-container-highest focus:border-primary rounded-xl px-4 py-3.5 text-sm focus:scale-[1.02] focus:shadow-md focus:shadow-primary/5 focus:outline-none transition-all placeholder:text-on-surface-variant/40 resize-none font-medium"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation & Submit */}
        <div className="mt-8 flex justify-between items-center gap-4 pt-4 border-t border-surface-container-low">
          {step > 1 && step <= 3 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors rounded-full hover:bg-surface-container-low"
            >
              Back
            </button>
          )}
          
          <button
            type="submit"
            disabled={
              (step === 1 && !isStep1Valid) || 
              (step === 2 && !isStep2Valid) || 
              (step === 3 && !isStep3Valid) ||
              isSubmitting
            }
            className={`flex items-center justify-center h-14 px-8 rounded-full font-bold text-[15px] transition-all flex-1 shadow-lg ${
              step === 1 && !isStep1Valid || step === 2 && !isStep2Valid || step === 3 && !isStep3Valid || isSubmitting
                ? "bg-surface-container-highest text-on-surface-variant/50 cursor-not-allowed shadow-none"
                : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
            } ${step === 1 ? "ml-auto" : ""}`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : step === 3 ? (
              <span className="flex items-center">
                Confirm & Book {currencySymbol}{price}
                <ChevronRight className="w-5 h-5 ml-1.5" />
              </span>
            ) : (
              <span className="flex items-center">
                Continue Setup
                <ChevronRight className="w-5 h-5 ml-1.5" />
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
