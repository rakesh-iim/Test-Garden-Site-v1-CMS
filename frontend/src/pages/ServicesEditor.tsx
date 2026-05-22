import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { CMSLayout } from '../components/CMSLayout';
import { api } from '../lib/api';

const inputCls = 'w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#5BA585] focus:ring-2 focus:ring-[#5BA585]/20';
const labelCls = 'text-[13px] font-semibold text-gray-600 mb-1.5 block';
const labelSmCls = 'text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block';

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: "terrace-transformation",
    title: "Terrace Transformation",
    desc: "Turn your underutilized rooftop or terrace into a sky-high sanctuary. We design bespoke urban gardens with custom planters, optimal drainage, and resilient planting schemes.",
    image: "/images/service-terrace.webp"
  },
  {
    id: "balcony-makeover",
    title: "Balcony Makeover",
    desc: "Maximize limited space with vertical gardens, custom-built seating, and curated container planting to create a lush, intimate retreat right outside your door.",
    image: "/images/service-balcony.webp"
  },
  {
    id: "penthouse-transformation",
    title: "Penthouse Transformation",
    desc: "Elevate your penthouse exteriors with luxury landscaping, incorporating architectural stonework, dynamic lighting, and elegant, wind-resilient flora.",
    image: "/images/service-penthouse.webp"
  },
  {
    id: "office-landscaping",
    title: "Office Landscaping",
    desc: "Develop vibrant, low-maintenance green spaces for educational or corporate campuses, establishing outdoor areas that inspire collaboration and provide a natural haven.",
    image: "/images/service-office.webp"
  }
];

export const ServicesEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/content/services');
        if (response.data?.data && Array.isArray(response.data.data.services)) {
          setServices(response.data.data.services);
        }
      } catch (error) {
        console.error('Error fetching services content', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (index: number, field: keyof ServiceItem, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await api.put('/content/services', { services });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving services content', error);
      alert('Failed to save services content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <Loader2 className="spin w-8 h-8 text-[#5BA585]" />
      </div>
    );
  }

  return (
    <CMSLayout 
      title="Services" 
      breadcrumbs={['Pages', 'Services']} 
      onSave={handleSave} 
      isSaving={isSaving} 
      saveSuccess={saveSuccess}
    >
      <p className="text-[14px] text-gray-500 -mt-4 mb-6">Manage the service cards displayed on the services page. You can customize the image, title, and description for each.</p>

      <div className="space-y-6">
        {services.map((service, index) => (
          <section key={service.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
            {/* Image Preview / Input */}
            <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-3">
              <label className={labelCls}>Card Image</label>
              <div className="aspect-[4/3] bg-gray-50 border border-gray-150 rounded-xl overflow-hidden relative group">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                  }}
                />
              </div>
              <div>
                <label className={labelSmCls}>Image URL</label>
                <input 
                  type="text" 
                  value={service.image} 
                  onChange={(e) => handleChange(index, 'image', e.target.value)} 
                  className={inputCls} 
                  placeholder="Paste URL from Media Library" 
                />
              </div>
            </div>

            {/* Inputs */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-[15px] font-bold text-gray-900">{service.title || 'Untitled Service'}</h3>
                <span className="text-[11px] font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {service.id.replace(/-/g, ' ')}
                </span>
              </div>

              <div>
                <label className={labelCls}>Display Title</label>
                <input 
                  type="text" 
                  value={service.title} 
                  onChange={(e) => handleChange(index, 'title', e.target.value)} 
                  className={inputCls} 
                  placeholder="Service Title" 
                />
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea 
                  value={service.desc} 
                  onChange={(e) => handleChange(index, 'desc', e.target.value)} 
                  className={`${inputCls} h-28 resize-none`} 
                  placeholder="Service description detail text..." 
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </CMSLayout>
  );
};
