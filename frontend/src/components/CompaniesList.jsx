import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaBuilding } from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import CompaniesAdd from './CompaniesAdd';
import CompaniesDetails from './CompaniesDetails';

// بيانات وهمية (ستُستبدل بالباكند لاحقاً)
const mockCompanies = [
  { id: 1, name: 'مساحات السعودية', email: 'info@saudi-spaces.com', phone: '0501234567', status: 'نشط', plan: 'باقة متقدمة', branches: 5 },
  { id: 2, name: 'أعمال الرياض', email: 'contact@riyadh.work', phone: '0559876543', status: 'نشط', plan: 'باقة أساسية', branches: 2 },
  { id: 3, name: 'فضاءات جدة', email: 'info@jeddah.space', phone: '0561122334', status: 'منتهي', plan: 'باقة متقدمة', branches: 0 },
];

const CompaniesList = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // فلترة الشركات
  const filteredCompanies = companies.filter(comp => {
    const matchesSearch = comp.name.includes(searchTerm) || comp.email.includes(searchTerm);
    const matchesStatus = filterStatus === 'الكل' || comp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // حذف شركة (مع 2FA مؤقتاً)
  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الشركة؟ سيتم طلب رمز 2FA للتأكيد.')) {
      setCompanies(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="p-6">
      {/* الهيدر */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaBuilding className="text-indigo-600" />
          إدارة الشركات
        </h1>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >
          <FaPlus /> إضافة شركة
        </Button>
      </div>

      {/* البحث والفلترة */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث باسم الشركة أو البريد..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400"
        >
          <option value="الكل">جميع الحالات</option>
          <option value="نشط">نشط</option>
          <option value="منتهي">منتهي</option>
          <option value="معلق">معلق</option>
        </select>
      </div>

      {/* الجدول */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">#</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الشركة</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">البريد</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الجوال</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الباقة</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الفروع</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((comp, idx) => (
                <tr key={comp.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium">{comp.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{comp.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{comp.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{comp.plan}</td>
                  <td className="px-6 py-4 text-sm text-center">{comp.branches}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      comp.status === 'نشط' ? 'bg-green-100 text-green-700' :
                      comp.status === 'منتهي' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {comp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setSelectedCompany(comp); setShowDetailsModal(true); }}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FaEye />
                      </button>
                      <button className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition">
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(comp.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCompanies.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-400">
                    لا توجد شركات مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* مودال الإضافة */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة شركة جديدة">
        <CompaniesAdd onClose={() => setShowAddModal(false)} />
      </Modal>

      {/* مودال التفاصيل */}
      <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} title="تفاصيل الشركة">
        <CompaniesDetails company={selectedCompany} onClose={() => setShowDetailsModal(false)} />
      </Modal>
    </div>
  );
};

export default CompaniesList;