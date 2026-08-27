import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import LocationFields from '../../components/UI/LocationFields';
import Button from '../../components/UI/Button';

const mockGroups = ['الرياض - شمال', 'الرياض - وسط', 'جدة - الشاطئ', 'الدمام - الخبر'];
const mockManagers = ['أحمد محمد', 'سارة علي', 'خالد حسن', 'غير معين'];

const BranchesAddEdit = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    group: initialData?.group || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    manager: initialData?.manager || '',
    location: {
      country: initialData?.location?.country || '',
      city: initialData?.location?.city || '',
      district: initialData?.location?.district || '',
      street: initialData?.location?.street || '',
      postalCode: initialData?.location?.postalCode || '',
      lat: initialData?.location?.lat || '',
      lng: initialData?.location?.lng || '',
    },
    parkingSpots: initialData?.parkingSpots || 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'اسم الفرع مطلوب';
    if (!formData.group) newErrors.group = 'المجموعة مطلوبة';
    if (!formData.phone) newErrors.phone = 'رقم الجوال مطلوب';
    if (!formData.email) newErrors.email = 'البريد الإلكتروني مطلوب';
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
        <Input label="اسم الفرع" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
        <Select label="المجموعة التابعة" name="group" value={formData.group} onChange={handleChange} options={mockGroups} error={errors.group} required />
        <Input label="رقم الجوال" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
        <Input label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <Select label="مدير الفرع" name="manager" value={formData.manager} onChange={handleChange} options={mockManagers} />
        <Input label="عدد مواقف السيارات" name="parkingSpots" type="number" value={formData.parkingSpots} onChange={handleChange} />
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-700 mb-3">الموقع الجغرافي</h3>
        <LocationFields formData={formData} setFormData={setFormData} errors={errors.location} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {initialData ? 'تحديث' : 'إضافة'}
        </Button>
      </div>
    </form>
  );
};

export default BranchesAddEdit;