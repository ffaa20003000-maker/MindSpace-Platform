import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUserCog, FaUser, FaUserSlash } from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import MembersAddEdit from './MembersAddEdit';
import { ROLE_LABELS } from '../../constants/roles';

const mockMembers = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@saudi-spaces.com', phone: '0501111111', role: 'company_admin', branch: 'المقر الرئيسي', status: 'نشط' },
  { id: 2, name: 'سارة علي', email: 'sara@riyadh.work', phone: '0502222222', role: 'branch_manager', branch: 'فرع العليا', status: 'نشط' },
  { id: 3, name: 'خالد حسن', email: 'khalid@jeddah.space', phone: '0503333333', role: 'cleaner', branch: 'فرع الشاطئ', status: 'معطل' },
];

const MembersList = () => {
  const [members, setMembers] = useState(mockMembers);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = members.filter(m => m.name.includes(searchTerm) || m.email.includes(searchTerm));

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: m.status === 'نشط' ? 'معطل' : 'نشط' } : m));
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserCog className="text-indigo-600" />
          إدارة الأعضاء
        </h1>
        <Button onClick={() => { setEditingMember(null); setShowModal(true); }}>
          <FaPlus /> إضافة عضو
        </Button>
      </div>

      <div className="flex gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <input
          type="text"
          placeholder="بحث باسم أو بريد العضو..."
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
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الاسم</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">البريد</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الدور</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الفرع</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, idx) => (
              <tr key={m.id} className="border-b hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm">{idx + 1}</td>
                <td className="px-6 py-4 font-medium">{m.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{m.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ROLE_LABELS[m.role] || m.role}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{m.branch}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleStatus(m.id)} className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-lg transition" title={m.status === 'نشط' ? 'تعطيل' : 'تفعيل'}>
                      {m.status === 'نشط' ? <FaUserSlash /> : <FaUser />}
                    </button>
                    <button onClick={() => { setEditingMember(m); setShowModal(true); }} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingMember ? 'تعديل عضو' : 'إضافة عضو جديد'}>
        <MembersAddEdit initialData={editingMember} onSave={(data) => {
          if (editingMember) {
            setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...data } : m));
          } else {
            setMembers(prev => [...prev, { id: Date.now(), ...data, status: 'نشط' }]);
          }
          setShowModal(false);
        }} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default MembersList;