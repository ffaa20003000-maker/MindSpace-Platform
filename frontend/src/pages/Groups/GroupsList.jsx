import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaLayerGroup } from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import GroupsAddEdit from './GroupsAddEdit';

// بيانات وهمية
const mockGroups = [
  { id: 1, name: 'الرياض - شمال', company: 'مساحات السعودية', branchesCount: 3 },
  { id: 2, name: 'الرياض - وسط', company: 'مساحات السعودية', branchesCount: 2 },
  { id: 3, name: 'جدة - الشاطئ', company: 'مساحات السعودية', branchesCount: 0 },
  { id: 4, name: 'الدمام - الخبر', company: 'أعمال الرياض', branchesCount: 1 },
];

const GroupsList = () => {
  const [groups, setGroups] = useState(mockGroups);
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(g =>
    g.name.includes(searchTerm) || g.company.includes(searchTerm)
  );

  const handleDelete = (id, name, branchesCount) => {
    if (branchesCount > 0) {
      alert(`لا يمكن حذف المجموعة "${name}" لأنها تحتوي على ${branchesCount} فرع/فروع.`);
      return;
    }
    if (window.confirm(`هل أنت متأكد من حذف المجموعة "${name}"؟`)) {
      setGroups(prev => prev.filter(g => g.id !== id));
    }
  };

  const handleEdit = (group) => {
    setEditingGroup(group);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGroup(null);
  };

  const handleSave = (data) => {
    if (editingGroup) {
      setGroups(prev => prev.map(g => g.id === editingGroup.id ? { ...g, ...data } : g));
    } else {
      setGroups(prev => [...prev, { id: Date.now(), ...data, branchesCount: 0 }]);
    }
    handleCloseModal();
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaLayerGroup className="text-indigo-600" />
          إدارة المجموعات
        </h1>
        <Button onClick={() => { setEditingGroup(null); setShowModal(true); }}>
          <FaPlus /> إضافة مجموعة
        </Button>
      </div>

      <div className="flex gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <input
          type="text"
          placeholder="بحث باسم المجموعة أو الشركة..."
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
              <th className="px-6 py-3 text-sm font-medium text-gray-500">اسم المجموعة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الشركة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">عدد الفروع</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((g, idx) => (
              <tr key={g.id} className="border-b hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm">{idx + 1}</td>
                <td className="px-6 py-4 font-medium">{g.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{g.company}</td>
                <td className="px-6 py-4 text-sm text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${g.branchesCount > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
                    {g.branchesCount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(g)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(g.id, g.name, g.branchesCount)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal} title={editingGroup ? 'تعديل مجموعة' : 'إضافة مجموعة جديدة'}>
        <GroupsAddEdit initialData={editingGroup} onSave={handleSave} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default GroupsList;