import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import LocationFields from '../../components/UI/LocationFields';
import Button from '../../components/UI/Button';

const plans = ['باقة أساسية', 'باقة متقدمة', 'باقة احترافية'];

const CompaniesEdit = ({ company, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: company?.name || '',
    email: company?.email || '',
    phone: company?.phone || '',
    commercialReg: company?.commercialReg || '',
    plan: company?.plan || '',
    status: company?.status || 'نشط',
    location: {
      country: company?.location?.country || '',
      city: company?.location?.city || '',
      district: company?.location?.district || '',
      street: company?.location?.street || '',
      postalCode: company?.location?.postalCode || '',
      lat: company?.location?.lat || '',
      lng: company?.location?.lng || '',
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'اسم الشركة مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!formData.phone) newErrors.phone = 'رقم الجوال مطلوب';
    if (!formData.plan) newErrors.plan = 'الباقة مطلوبة';
    if (!formData.location?.country) newErrors.location = { ...newErrors.location, country: 'الدولة مطلوبة' };
    if (!formData.location?.city) newErrors.location = { ...newErrors.location, city: 'المدينة مطلوبة' };
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="اسم الشركة" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
        <Input label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <Input label="رقم الجوال" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
        <Input label="السجل التجاري" name="commercialReg" value={formData.commercialReg} onChange={handleChange} error={errors.commercialReg} required />
        <Select label="الباقة" name="plan" value={formData.plan} onChange={handleChange} options={plans} error={errors.plan} required />
        <Select label="الحالة" name="status" value={formData.status} onChange={handleChange} options={['نشط', 'منتهي', 'معلق']} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">شعار الشركة (اختياري)</label>
        <input type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded-xl bg-gray-50 text-sm" />
        {company?.logo && <p className="text-xs text-gray-400 mt-1">الشعار الحالي: {company.logo}</p>}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-700 mb-3">الموقع الجغرافي (المقر الرئيسي)</h3>
        <LocationFields formData={formData} setFormData={setFormData} errors={errors.location} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">تحديث الشركة</Button>
      </div>
    </form>
  );
};

export default CompaniesEdit;