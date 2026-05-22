import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { CMSLayout } from '../components/CMSLayout';
import { api } from '../lib/api';

// Shared input classes
const inputCls = 'w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#5BA585] focus:ring-2 focus:ring-[#5BA585]/20';
const labelCls = 'text-[13px] font-semibold text-gray-600 mb-1.5 block';
const labelSmCls = 'text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block';

interface TestimonialItem {
  quote?: string;
  name?: string;
  location?: string;
  avatar?: string;
}

export const HomePageEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    hero_top_text: '',
    hero_main_text: '',
    hero_sub_text: '',
    about_title: '',
    about_text: '',
    testimonials: [] as TestimonialItem[]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content/homepage');
        if (response.data?.data) {
          setFormData(prev => ({ 
            ...prev, 
            ...response.data.data,
            testimonials: response.data.data.testimonials || []
          }));
        }
      } catch (error) {
        console.error('Error fetching homepage content', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (arrayName: 'testimonials', index: number, field: string, value: string) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName: 'testimonials', emptyItem: TestimonialItem) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], emptyItem] });
  };

  const removeArrayItem = (arrayName: 'testimonials', index: number) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await api.put('/content/homepage', formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content', error);
      alert('Failed to save content. Please try again.');
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
      title="Homepage" 
      breadcrumbs={['Pages', 'Homepage']} 
      onSave={handleSave} 
      isSaving={isSaving} 
      saveSuccess={saveSuccess}
    >
      <p className="text-[14px] text-gray-500 -mt-4 mb-6">Manage the content blocks that appear on your landing page.</p>
      
      <div className="space-y-6">
        {/* Hero Section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-[15px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Top Subheading</label>
              <input type="text" name="hero_top_text" value={formData.hero_top_text} onChange={handleChange} className={inputCls} placeholder="e.g. Premium Landscaping Services" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Main Title (Line 1)</label>
                <input type="text" name="hero_main_text" value={formData.hero_main_text} onChange={handleChange} className={`${inputCls} font-semibold`} placeholder="Crafting Nature's" />
              </div>
              <div>
                <label className={labelCls}>Accent Text (Green)</label>
                <input type="text" name="hero_sub_text" value={formData.hero_sub_text} onChange={handleChange} className={inputCls} placeholder="Masterpieces" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-[15px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            About Us / Cultivate Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Section Title</label>
              <input type="text" name="about_title" value={formData.about_title} onChange={handleChange} className={inputCls} placeholder="Cultivate your perfect space." />
            </div>
            <div>
              <label className={labelCls}>Main Paragraph</label>
              <textarea 
                name="about_text" 
                value={formData.about_text} 
                onChange={handleChange} 
                className={`${inputCls} h-28 resize-none`} 
                placeholder="Ready to bring breathing room and lush vitality..." 
              />
            </div>
          </div>
        </section>

        {/* Testimonials Array */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-[15px] font-bold text-gray-900">Client Testimonials</h2>
            <button 
              onClick={() => addArrayItem('testimonials', { quote: '', name: '', location: '', avatar: '' })}
              className="text-[13px] flex items-center gap-1.5 text-[#5BA585] font-semibold hover:bg-[#5BA585]/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-4">
            {formData.testimonials.length === 0 && (
              <div className="text-center py-8 text-[13px] text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                No overrides — the website uses defaults from code.
              </div>
            )}
            {formData.testimonials.map((item, index) => (
              <div key={index} className="relative bg-gray-50/80 border border-gray-200 rounded-lg p-4">
                <button 
                  onClick={() => removeArrayItem('testimonials', index)}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="space-y-3 pr-8">
                  <div>
                    <label className={labelSmCls}>Quote</label>
                    <textarea value={item.quote || ''} onChange={e => handleArrayChange('testimonials', index, 'quote', e.target.value)} className={`${inputCls} h-20 resize-none`} placeholder="Their landscaping work was outstanding..." />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelSmCls}>Client Name</label>
                      <input type="text" value={item.name || ''} onChange={e => handleArrayChange('testimonials', index, 'name', e.target.value)} className={inputCls} placeholder="Sarah Jenkins" />
                    </div>
                    <div>
                      <label className={labelSmCls}>Location</label>
                      <input type="text" value={item.location || ''} onChange={e => handleArrayChange('testimonials', index, 'location', e.target.value)} className={inputCls} placeholder="The Oaks" />
                    </div>
                  </div>
                  <div>
                    <label className={labelSmCls}>Avatar URL <span className="font-normal text-gray-300">(optional)</span></label>
                    <input type="text" value={item.avatar || ''} onChange={e => handleArrayChange('testimonials', index, 'avatar', e.target.value)} className={inputCls} placeholder="/images/avatar-1.webp" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CMSLayout>
  );
};
