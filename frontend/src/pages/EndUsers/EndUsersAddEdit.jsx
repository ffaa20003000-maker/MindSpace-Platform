import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

const userTypes = ['فرد', 'شركة'];

const EndUsersAddEdit = ({ initialData, onSave, onCancel }) => {
  const isCorporate = initialData?.type === 'corporate';
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    type: initialData?.type || 'individual',
    companyName: initialData?.companyName || '',
    commercialReg: initialData?.commercialReg || '',
    address: initialData?.address || '',
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
    if (formData.type === 'corporate') {
      if (!formData.companyName) newErrors.companyName = 'اسم الشركة مطلوب';
      if (!formData.commercialReg) newErrors.commercialReg = 'السجل التجاري مطلوب';
      if (!formData.address) newErrors.address = 'العنوان مطلوب';
    }
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
      <Select label="نوع العميل" name="type" value={formData.type} onChange={handleChange} options={userTypes} required />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="الاسم الكامل" name="name" value={formData.name} onChange={handleChange} error={errors.name} required />
        <Input label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <Input label="رقم الجوال" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
      </div>

      {formData.type === 'شركة' && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <h3 className="font-medium text-gray-700">بيانات الشركة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="اسم الشركة" name="companyName" value={formData.companyName} onChange={handleChange} error={errors.companyName} required />
            <Input label="السجل التجاري" name="commercialReg" value={formData.commercialReg} onChange={handleChange} error={errors.commercialReg} required />
            <Input label="العنوان" name="address" value={formData.address} onChange={handleChange} error={errors.address} required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الشعار (اختياري)</label>
              <input type="file" accept="image/*" className="w-full p-2 border border-gray-200 rounded-xl bg-gray-50 text-sm" />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>إلغاء</Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {initialData ? 'تحديث' : 'إضافة'}
        </Button>
      </div>
    </form>
  );
};

export default EndUsersAddEdit;