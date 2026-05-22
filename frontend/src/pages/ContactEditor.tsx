import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { CMSLayout } from '../components/CMSLayout';
import { api } from '../lib/api';

const inputCls = 'w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-[#5BA585] focus:ring-2 focus:ring-[#5BA585]/20';
const labelCls = 'text-[13px] font-semibold text-gray-600 mb-1.5 block';
const labelSmCls = 'text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block';

interface LocationItem {
  id: string;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapSrc?: string;
  directionsLink?: string;
  comingSoon?: boolean;
}

export const ContactEditor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [headerTitle, setHeaderTitle] = useState("Let's Cultivate Something Beautiful");
  const [locations, setLocations] = useState<LocationItem[]>([
    {
      id: 'ahmedabad',
      city: 'Ahmedabad',
      address: 'MrGardenr, Iskcon Cross Rd, Sanidhya, Ahmedabad, Gujarat 380058',
      phone: '+91-9761655546',
      email: 'hello@mrgardenr.in',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.909533143002!2d72.50156758543913!3d23.02709366246803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b83de8291d1%3A0xec509cec14cfa578!2sMr%20Gardenr%20-%20Ahmedabad!5e0!3m2!1sen!2sin!4v1779099884600!5m2!1sen!2sin',
      directionsLink: 'https://maps.app.goo.gl/eageJXthMfx4D9ZQ6'
    },
    {
      id: 'surat',
      city: 'Surat',
      address: 'MrGardenr, GF 6, VR Mall, Luxuria business hub, road, opposite Imax cinema, New Magdalla, Surat, Rundh, Gujarat 395007',
      phone: '+91-9761655546',
      email: 'hello@mrgardenr.in',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1381590524315!2d72.75709447584363!3d21.146899383709286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d7fec304a13%3A0x784ec8954a182ed9!2sMr%20Gardenr!5e0!3m2!1sen!2sin!4v1779098199760!5m2!1sen!2sin',
      directionsLink: 'https://maps.app.goo.gl/mk7JizK3GrhjwU7y6'
    },
    {
      id: 'vadodara',
      city: 'Vadodara',
      address: 'Mr Gardenr, Vishwas Colony, Jetalpur Road, Vadodara, Gujarat 390007',
      phone: '+91-9761655546',
      email: 'hello@mrgardenr.in',
      hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.2012610274564!2d73.16682537586647!3d22.308226942607032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9007154ad47%3A0x8c5d2a8f2c0d88ef!2sMr%20Gardenr!5e0!3m2!1sen!2sin!4v1779100209095!5m2!1sen!2sin',
      directionsLink: 'https://maps.app.goo.gl/5pF7Z2ScodBR66yC9'
    },
    {
      id: 'bangalore',
      city: 'Bangalore',
      comingSoon: true
    },
    {
      id: 'pune',
      city: 'Pune',
      comingSoon: true
    }
  ]);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await api.get('/content/contact');
        if (response.data?.data) {
          if (response.data.data.headerTitle) {
            setHeaderTitle(response.data.data.headerTitle);
          }
          if (Array.isArray(response.data.data.locations)) {
            setLocations(response.data.data.locations);
          }
        }
      } catch (error) {
        console.error('Error fetching contact content', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactData();
  }, []);

  const handleLocationChange = (index: number, field: keyof LocationItem, value: LocationItem[keyof LocationItem]) => {
    const updated = [...locations];
    updated[index] = { ...updated[index], [field]: value };
    setLocations(updated);
  };

  const addLocation = () => {
    const id = `loc-${Date.now()}`;
    setLocations([...locations, { id, city: 'New City', comingSoon: true }]);
  };

  const removeLocation = (index: number) => {
    const updated = [...locations];
    updated.splice(index, 1);
    setLocations(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await api.put('/content/contact', {
        headerTitle,
        locations
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving contact content', error);
      alert('Failed to save contact content. Please try again.');
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
      title="Contact Us" 
      breadcrumbs={['Pages', 'Contact Us']} 
      onSave={handleSave} 
      isSaving={isSaving} 
      saveSuccess={saveSuccess}
    >
      <p className="text-[14px] text-gray-500 -mt-4 mb-6">Manage your contact page content, office addresses, maps, and store location information.</p>

      <div className="space-y-6">
        {/* Header Settings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-[15px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
            Contact Page Header
          </h2>
          <div>
            <label className={labelCls}>Title / Catchphrase</label>
            <input 
              type="text" 
              value={headerTitle} 
              onChange={(e) => setHeaderTitle(e.target.value)} 
              className={inputCls} 
              placeholder="e.g. Let's Cultivate Something Beautiful" 
            />
          </div>
        </section>

        {/* Store Locations List */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-[15px] font-bold text-gray-900">Office & Store Locations</h2>
            <button 
              onClick={addLocation}
              className="text-[13px] flex items-center gap-1.5 text-[#5BA585] font-semibold hover:bg-[#5BA585]/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Location
            </button>
          </div>

          <div className="space-y-6">
            {locations.length === 0 && (
              <div className="text-center py-8 text-[13px] text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                No locations defined.
              </div>
            )}
            
            {locations.map((loc, index) => (
              <div key={loc.id} className="relative bg-gray-50/80 border border-gray-200 rounded-xl p-5">
                <button 
                  onClick={() => removeLocation(index)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City Name */}
                  <div>
                    <label className={labelSmCls}>City</label>
                    <input 
                      type="text" 
                      value={loc.city} 
                      onChange={(e) => handleLocationChange(index, 'city', e.target.value)} 
                      className={inputCls} 
                      placeholder="e.g. Pune" 
                    />
                  </div>

                  {/* Status: Coming Soon Checkbox */}
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] font-semibold text-gray-600">
                      <input 
                        type="checkbox" 
                        checked={!!loc.comingSoon} 
                        onChange={(e) => handleLocationChange(index, 'comingSoon', e.target.checked)}
                        className="rounded border-gray-300 text-[#5BA585] focus:ring-[#5BA585]/20 w-4 h-4"
                      />
                      <span>Is "Coming Soon" (No details needed yet)</span>
                    </label>
                  </div>

                  {/* Details (only if NOT coming soon) */}
                  {!loc.comingSoon && (
                    <>
                      <div className="md:col-span-2">
                        <label className={labelSmCls}>Full Address</label>
                        <input 
                          type="text" 
                          value={loc.address || ''} 
                          onChange={(e) => handleLocationChange(index, 'address', e.target.value)} 
                          className={inputCls} 
                          placeholder="e.g. MrGardenr, Iskcon Cross Rd..." 
                        />
                      </div>

                      <div>
                        <label className={labelSmCls}>Phone Number</label>
                        <input 
                          type="text" 
                          value={loc.phone || ''} 
                          onChange={(e) => handleLocationChange(index, 'phone', e.target.value)} 
                          className={inputCls} 
                          placeholder="e.g. +91-9761655546" 
                        />
                      </div>

                      <div>
                        <label className={labelSmCls}>Email Address</label>
                        <input 
                          type="email" 
                          value={loc.email || ''} 
                          onChange={(e) => handleLocationChange(index, 'email', e.target.value)} 
                          className={inputCls} 
                          placeholder="e.g. hello@mrgardenr.in" 
                        />
                      </div>

                      <div>
                        <label className={labelSmCls}>Working Hours</label>
                        <input 
                          type="text" 
                          value={loc.hours || ''} 
                          onChange={(e) => handleLocationChange(index, 'hours', e.target.value)} 
                          className={inputCls} 
                          placeholder="e.g. Mon - Sat: 10:00 AM - 7:00 PM" 
                        />
                      </div>

                      <div>
                        <label className={labelSmCls}>Directions Map Link</label>
                        <input 
                          type="text" 
                          value={loc.directionsLink || ''} 
                          onChange={(e) => handleLocationChange(index, 'directionsLink', e.target.value)} 
                          className={inputCls} 
                          placeholder="e.g. https://maps.app.goo.gl/..." 
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelSmCls}>Google Maps Embed URL (Iframe Src)</label>
                        <input 
                          type="text" 
                          value={loc.mapSrc || ''} 
                          onChange={(e) => handleLocationChange(index, 'mapSrc', e.target.value)} 
                          className={inputCls} 
                          placeholder="https://www.google.com/maps/embed?pb=..." 
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CMSLayout>
  );
};
