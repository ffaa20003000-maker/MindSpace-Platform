import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUserFriends, FaUser, FaBuilding, FaStar } from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import EndUsersAddEdit from './EndUsersAddEdit';

const mockUsers = [
  { id: 1, name: 'محمد العمري', email: 'mohammed@email.com', phone: '0501112222', type: 'individual', loyaltyPoints: 120, status: 'نشط' },
  { id: 2, name: 'شركة التقنية المتقدمة', email: 'info@tech-adv.com', phone: '0503334444', type: 'corporate', loyaltyPoints: 450, status: 'نشط' },
];

const EndUsersList = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = users.filter(u => u.name.includes(searchTerm) || u.email.includes(searchTerm));

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حظر هذا العميل؟')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserFriends className="text-indigo-600" />
          إدارة العملاء المنتفعين
        </h1>
        <Button onClick={() => { setEditingUser(null); setShowModal(true); }}>
          <FaPlus /> إضافة عميل
        </Button>
      </div>

      <div className="flex gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <input
          type="text"
          placeholder="بحث باسم أو بريد العميل..."
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
              <th className="px-6 py-3 text-sm font-medium text-gray-500">النوع</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">نقاط الولاء</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={u.id} className="border-b hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm">{idx + 1}</td>
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{u.type === 'individual' ? <FaUser className="inline ml-1" /> : <FaBuilding className="inline ml-1" />} {u.type === 'individual' ? 'فرد' : 'شركة'}</td>
                <td className="px-6 py-4 text-sm font-bold text-yellow-600">{u.loyaltyPoints} <FaStar className="inline text-yellow-400" /></td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingUser(u); setShowModal(true); }} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(u.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingUser ? 'تعديل عميل' : 'إضافة عميل جديد'}>
        <EndUsersAddEdit initialData={editingUser} onSave={(data) => {
          if (editingUser) {
            setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...data } : u));
          } else {
            setUsers(prev => [...prev, { id: Date.now(), ...data, status: 'نشط', loyaltyPoints: 0 }]);
          }
          setShowModal(false);
        }} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default EndUsersList;