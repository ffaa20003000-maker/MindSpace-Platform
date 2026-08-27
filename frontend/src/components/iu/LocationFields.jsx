import React from 'react';
import Input from './Input';
import Select from './Select';

// قائمة الدول والمدن (مؤقتة - ستُجلب من الباكند لاحقاً)
const countries = ['السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان'];
const cities = {
  'السعودية': ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة', 'الخبر'],
  'الإمارات': ['دبي', 'أبوظبي', 'الشارقة'],
  'الكويت': ['مدينة الكويت', 'حولي'],
  'قطر': ['الدوحة', 'الوكرة'],
  'البحرين': ['المنامة', 'المحرق'],
  'عمان': ['مسقط', 'صلالة'],
};

const LocationFields = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, location: { ...prev.location, [name]: value } }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        country: country,
        city: '', // إعادة تعيين المدينة عند تغيير الدولة
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="الدولة"
        name="country"
        value={formData.location?.country || ''}
        onChange={handleCountryChange}
        options={countries}
        error={errors?.location?.country}
        required
      />
      <Select
        label="المدينة"
        name="city"
        value={formData.location?.city || ''}
        onChange={handleChange}
        options={formData.location?.country ? cities[formData.location.country] || [] : []}
        error={errors?.location?.city}
        required
        disabled={!formData.location?.country}
      />
      <Input
        label="الحي / المنطقة"
        name="district"
        value={formData.location?.district || ''}
        onChange={handleChange}
        error={errors?.location?.district}
        placeholder="مثال: العليا، الشاطئ"
      />
      <Input
        label="الشارع ورقم المبنى"
        name="street"
        value={formData.location?.street || ''}
        onChange={handleChange}
        error={errors?.location?.street}
        placeholder="مثال: شارع الملك فهد، مبنى ١٢٣"
      />
      <Input
        label="الرمز البريدي"
        name="postalCode"
        value={formData.location?.postalCode || ''}
        onChange={handleChange}
        error={errors?.location?.postalCode}
        placeholder="مثال: ١٢٣٤٥"
      />
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          الإحداثيات (GPS) - اختياري
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="خط العرض (Latitude)"
            name="lat"
            value={formData.location?.lat || ''}
            onChange={handleChange}
            placeholder="مثال: 24.7136"
          />
          <Input
            label="خط الطول (Longitude)"
            name="lng"
            value={formData.location?.lng || ''}
            onChange={handleChange}
            placeholder="مثال: 46.6753"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">يمكنك الحصول على الإحداثيات من خرائط جوجل</p>
      </div>
    </div>
  );
};

export default LocationFields;