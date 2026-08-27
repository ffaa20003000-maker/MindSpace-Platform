// ============================================================
// ملف: pages/Devices/DevicesAddEdit.jsx
// الوظيفة: نموذج إضافة أو تعديل جهاز
// ============================================================

import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

const deviceTypes = [
  { value: 'air_quality', label: 'حساس جودة هواء' },
  { value: 'screen', label: 'شاشة حجز' },
  { value: 'ac', label: 'مكيف' },
  { value: 'lock', label: 'قفل باب' },
  { value: 'light', label: 'إضاءة' },
];

const mockBranches = ['فرع الملقا', 'فرع القيروان', 'فرع العليا', 'فرع التخصصي'];

const DevicesAddEdit = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || '',
    branch: initialData?.branch || '',
    location: initialData?.location || '',
    status: initialData?.status || 'online',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'اسم الجهاز مطلوب';
    if (!formData.type) newErrors.type = 'نوع الجهاز مطلوب';
    if (!formData.branch) newErrors.branch = 'الفرع مطلوب';
    if (!formData.location) newErrors.location = 'الموقع مطلوب';
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
        <Input 
          label="اسم الجهاز" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          error={errors.name} 
          required 
          placeholder="مثال: حساس CO2 - غرفة 101"
        />
        <Select 
          label="نوع الجهاز" 
          name="type" 
          value={formData.type} 
          onChange={handleChange} 
          options={deviceTypes.map(t => t.value)} 
          optionLabels={deviceTypes.map(t => t.label)}
          error={errors.type} 
          required 
        />
        <Select 
          label="الفرع التابع" 
          name="branch" 
          value={formData.branch} 
          onChange={handleChange} 
          options={mockBranches} 
          error={errors.branch} 
          required 
        />
        <Input 
          label="الموقع داخل الفرع" 
          name="location" 
          value={formData.location} 
          onChange={handleChange} 
          error={errors.location} 
          required 
          placeholder="مثال: الطابق الثاني - غرفة 101"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          المعرف الفريد (Device ID) - اختياري
        </label>
        <input 
          type="text" 
          disabled 
          placeholder="سيتم توليده تلقائياً عند الحفظ" 
          className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
        />
        <p className="text-xs text-gray-400 mt-1">سيتم إرسال هذا المعرف للجهاز لتثبيته وتوصيله بالمنصة</p>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          {initialData ? 'تحديث' : 'إضافة'}
        </Button>
      </div>
    </form>
  );
};

export default DevicesAddEdit;