import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';
import { ROLE_OPTIONS } from '../../constants/roles';

const mockBranches = ['المقر الرئيسي', 'فرع العليا', 'فرع التخصصي', 'فرع الشاطئ'];

const MembersAddEdit = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    role: initialData?.role || '',
    branch: initialData?.branch || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'الاسم مطلوب';
    if (!formData.email) newErrors.email = 'البريد مطلوب';
    if (!formData.phone) newErrors.phone = 'رقم الجوال مطلوب';
    if (!formData.role) newErrors.role = 'الدور مطلوب';
    if (!formData.branch) newErrors.branch = 'الفرع مطلوب';
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
        <Input label="الاسم الكامل" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
        <Input label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <Input label="رقم الجوال" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
        <Select label="الدور (الصلاحية)" name="role" value={formData.role} onChange={handleChange} options={ROLE_OPTIONS.map(r => r.label)} error={errors.role} required />
        <Select label="الفرع التابع" name="branch" value={formData.branch} onChange={handleChange} options={mockBranches} error={errors.branch} required />
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

export default MembersAddEdit;