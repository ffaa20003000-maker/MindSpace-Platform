import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Button from '../../components/UI/Button';

const CompaniesDetails = ({ company, onClose }) => {
  if (!company) return null;

  // بيانات وهمية للفروع (سيتم جلبها من الباكند)
  const mockBranches = [
    { id: 1, name: 'فرع العليا', city: 'الرياض', status: 'نشط' },
    { id: 2, name: 'فرع التخصصي', city: 'الرياض', status: 'نشط' },
    { id: 3, name: 'فرع الشاطئ', city: 'جدة', status: 'متوقف' },
  ];

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto px-2">
      {/* رأس الشركة */}
      <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl shadow-md">
          🏢
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
          <p className="text-gray-500">{company.email}</p>
          <p className="text-gray-500">{company.phone}</p>
        </div>
        <div className="mr-auto">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            company.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {company.status === 'نشط' ? <FaCheckCircle className="inline ml-1" /> : <FaTimesCircle className="inline ml-1" />}
            {company.status}
          </span>
        </div>
      </div>

      {/* معلومات أساسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">السجل التجاري</p>
          <p className="font-medium">{company.commercialReg || '١٢٣٤٥٦'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">الباقة</p>
          <p className="font-medium">{company.plan || 'باقة متقدمة'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">تاريخ الاشتراك</p>
          <p className="font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-indigo-500" />
            ١ يناير ٢٠٢٥
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-sm text-gray-400">تاريخ الانتهاء</p>
          <p className="font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-red-500" />
            ٣١ ديسمبر ٢٠٢٥
          </p>
        </div>
      </div>

      {/* الموقع */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-3">
          <FaMapMarkerAlt className="text-indigo-500" />
          الموقع الجغرافي (المقر الرئيسي)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div><span className="text-gray-400">الدولة:</span> {company.location?.country || 'السعودية'}</div>
          <div><span className="text-gray-400">المدينة:</span> {company.location?.city || 'الرياض'}</div>
          <div><span className="text-gray-400">الحي:</span> {company.location?.district || 'العليا'}</div>
          <div><span className="text-gray-400">الشارع:</span> {company.location?.street || 'شارع الملك فهد'}</div>
          <div><span className="text-gray-400">الرمز البريدي:</span> {company.location?.postalCode || '١٢٣٤٥'}</div>
          <div><span className="text-gray-400">الإحداثيات:</span> {company.location?.lat || '24.7136'}, {company.location?.lng || '46.6753'}</div>
        </div>
      </div>

      {/* الفروع التابعة */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-3">
          <FaBuilding className="text-indigo-500" />
          الفروع التابعة ({mockBranches.length})
        </h4>
        <div className="space-y-2">
          {mockBranches.map(branch => (
            <div key={branch.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
              <div>
                <p className="font-medium">{branch.name}</p>
                <p className="text-xs text-gray-400">{branch.city}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                branch.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {branch.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClose}>
          إغلاق
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          تعديل الشركة
        </Button>
      </div>
    </div>
  );
};

export default CompaniesDetails;