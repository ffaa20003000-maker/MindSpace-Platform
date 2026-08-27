import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

const durations = ['شهر', '3 أشهر', '6 أشهر', 'سنة'];

const PlansAddEdit = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    duration: initialData?.duration || 'شهر',
    maxBranches: initialData?.maxBranches || 0,
    maxMembers: initialData?.maxMembers || 0,
    maxDevices: initialData?.maxDevices || 0,
    maxRooms: initialData?.maxRooms || 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'اسم الباقة مطلوب';
    if (!formData.price) newErrors.price = 'السعر مطلوب';
    if (!formData.duration) newErrors.duration = 'المدة مطلوبة';
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="اسم الباقة" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
        <Input label="السعر (ريال)" name="price" type="number" value={formData.price} onChange={handleChange} error={errors.price} required />
        <Select label="المدة" name="duration" value={formData.duration} onChange={handleChange} options={durations} error={errors.duration} required />
        <Input label="عدد الفروع (0 = غير محدود)" name="maxBranches" type="number" value={formData.maxBranches} onChange={handleChange} />
        <Input label="عدد الأعضاء (0 = غير محدود)" name="maxMembers" type="number" value={formData.maxMembers} onChange={handleChange} />
        <Input label="عدد الأجهزة (0 = غير محدود)" name="maxDevices" type="number" value={formData.maxDevices} onChange={handleChange} />
        <Input label="عدد الغرف (0 = غير محدود)" name="maxRooms" type="number" value={formData.maxRooms} onChange={handleChange} />
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

export default PlansAddEdit;