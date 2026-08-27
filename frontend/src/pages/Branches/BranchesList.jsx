import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import BranchesAddEdit from './BranchesAddEdit';
import BranchesMapView from './BranchesMapView';

const mockBranches = [
  { id: 1, name: 'فرع العليا', group: 'الرياض - شمال', company: 'مساحات السعودية', city: 'الرياض', status: 'نشط', manager: 'أحمد محمد' },
  { id: 2, name: 'فرع التخصصي', group: 'الرياض - وسط', company: 'مساحات السعودية', city: 'الرياض', status: 'نشط', manager: 'سارة علي' },
  { id: 3, name: 'فرع الشاطئ', group: 'جدة - الشاطئ', company: 'مساحات السعودية', city: 'جدة', status: 'متوقف', manager: '-' },
];

const BranchesList = () => {
  const [branches, setBranches] = useState(mockBranches);
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = branches.filter(b => b.name.includes(searchTerm) || b.company.includes(searchTerm));

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
      setBranches(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-indigo-600" />
          إدارة الفروع
        </h1>
        <div className="flex gap-3">
          <Button onClick={() => setShowMap(true)} variant="outline">
            <FaEye /> عرض على الخريطة
          </Button>
          <Button onClick={() => { setEditingBranch(null); setShowModal(true); }}>
            <FaPlus /> إضافة فرع
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <input
          type="text"
          placeholder="بحث باسم الفرع أو الشركة..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">#</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الفرع</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">المجموعة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">المدينة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">المدير</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, idx) => (
              <tr key={b.id} className="border-b hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm">{idx + 1}</td>
                <td className="px-6 py-4 font-medium">{b.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.group}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.city}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{b.manager}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingBranch(b); setShowModal(true); }} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(b.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingBranch ? 'تعديل فرع' : 'إضافة فرع جديد'}>
        <BranchesAddEdit initialData={editingBranch} onSave={(data) => {
          if (editingBranch) {
            setBranches(prev => prev.map(b => b.id === editingBranch.id ? { ...b, ...data } : b));
          } else {
            setBranches(prev => [...prev, { id: Date.now(), ...data, status: 'نشط' }]);
          }
          setShowModal(false);
        }} onCancel={() => setShowModal(false)} />
      </Modal>

      <Modal isOpen={showMap} onClose={() => setShowMap(false)} title="عرض الفروع على الخريطة">
        <BranchesMapView branches={branches} />
      </Modal>
    </div>
  );
};

export default BranchesList;