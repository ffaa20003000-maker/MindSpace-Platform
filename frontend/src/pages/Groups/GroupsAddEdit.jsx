import React, { useState } from 'react';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import Button from '../../components/UI/Button';

// قائمة الشركات الوهمية (ستُجلب من الباكند)
const companiesList = ['مساحات السعودية', 'أعمال الرياض', 'فضاءات جدة'];

const GroupsAddEdit = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    company: initialData?.company || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'اسم المجموعة مطلوب';
    if (!formData.company) newErrors.company = 'الشركة مطلوبة';
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
      <Input
        label="اسم المجموعة"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        placeholder="مثال: الرياض - شمال"
      />
      <Select
        label="الشركة التابعة"
        name="company"
        value={formData.company}
        onChange={handleChange}
        options={companiesList}
        error={errors.company}
        required
      />
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

export default GroupsAddEdit;