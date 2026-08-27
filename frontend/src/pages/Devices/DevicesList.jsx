// ============================================================
// ملف: pages/Devices/DevicesList.jsx
// الوظيفة: عرض وإدارة جميع الأجهزة المتصلة بالمنصة
// ============================================================

import React, { useState } from 'react';
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaEye, 
  FaServer, FaThermometerHalf, FaSnowflake, FaLock,
  FaWifi, FaWifiSlash, FaExclamationTriangle,
  FaMicrochip, FaTools, FaCheckCircle, FaClock
} from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import DevicesAddEdit from './DevicesAddEdit';
import DeviceDetails from './DeviceDetails';

// ============================================================
// البيانات الوهمية (ستُستبدل بالباكند)
// ============================================================

const mockDevices = [
  { 
    id: 1, 
    name: 'حساس جودة الهواء - غرفة 101', 
    type: 'air_quality', 
    branch: 'فرع الملقا', 
    location: 'الطابق الثاني - غرفة 101',
    status: 'online',
    lastReading: 'CO2: 420 ppm, Temp: 24°C, Humidity: 55%',
    icon: <FaThermometerHalf />,
    alert: false
  },
  { 
    id: 2, 
    name: 'شاشة الحجز - المدخل الرئيسي', 
    type: 'screen', 
    branch: 'فرع الملقا', 
    location: 'المدخل الرئيسي',
    status: 'online',
    lastReading: 'آخر تحديث: 10:30',
    icon: <FaServer />,
    alert: false
  },
  { 
    id: 3, 
    name: 'مكيف - غرفة الاجتماعات A', 
    type: 'ac', 
    branch: 'فرع القيروان', 
    location: 'الطابق الأول - غرفة A',
    status: 'offline',
    lastReading: 'غير متصل منذ 15 دقيقة',
    icon: <FaSnowflake />,
    alert: true
  },
  { 
    id: 4, 
    name: 'قفل الباب - غرفة 203', 
    type: 'lock', 
    branch: 'فرع الملقا', 
    location: 'الطابق الثاني - غرفة 203',
    status: 'online',
    lastReading: 'مغلق - آخر فتح: 09:15',
    icon: <FaLock />,
    alert: false
  },
  { 
    id: 5, 
    name: 'حساس CO2 - غرفة التدريب', 
    type: 'air_quality', 
    branch: 'فرع القيروان', 
    location: 'الطابق الأرضي - غرفة التدريب',
    status: 'maintenance',
    lastReading: 'يحتاج معايرة',
    icon: <FaThermometerHalf />,
    alert: true
  },
];

// ============================================================
// مكون إدارة الأجهزة الرئيسي
// ============================================================

const DevicesList = () => {
  const [devices, setDevices] = useState(mockDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('الكل');
  const [filterType, setFilterType] = useState('الكل');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // ===== دوال الفلترة =====
  const getUniqueBranches = () => {
    const branches = devices.map(d => d.branch);
    return ['الكل', ...new Set(branches)];
  };

  const getUniqueTypes = () => {
    const types = devices.map(d => d.type);
    return ['الكل', ...new Set(types)];
  };

  const getStatusLabel = (status) => {
    const map = {
      'online': 'متصل',
      'offline': 'غير متصل',
      'maintenance': 'تحت الصيانة'
    };
    return map[status] || status;
  };

  const getStatusColor = (status) => {
    const map = {
      'online': 'bg-green-100 text-green-700',
      'offline': 'bg-red-100 text-red-700',
      'maintenance': 'bg-yellow-100 text-yellow-700'
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.includes(searchTerm) || 
                          device.branch.includes(searchTerm) ||
                          device.location.includes(searchTerm);
    const matchesBranch = filterBranch === 'الكل' || device.branch === filterBranch;
    const matchesType = filterType === 'الكل' || device.type === filterType;
    const matchesStatus = filterStatus === 'الكل' || device.status === filterStatus;
    return matchesSearch && matchesBranch && matchesType && matchesStatus;
  });

  // ===== دوال التحكم =====
  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الجهاز؟ سيتم فصله عن المنصة نهائياً.')) {
      setDevices(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    setShowAddModal(true);
  };

  const handleViewDetails = (device) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
  };

  const handleSaveDevice = (data) => {
    if (editingDevice) {
      setDevices(prev => prev.map(d => 
        d.id === editingDevice.id ? { ...d, ...data } : d
      ));
    } else {
      setDevices(prev => [...prev, { 
        id: Date.now(), 
        ...data, 
        status: 'online',
        lastReading: 'جاري الاتصال...',
        icon: <FaMicrochip />,
        alert: false
      }]);
    }
    setShowAddModal(false);
    setEditingDevice(null);
  };

  // ===== إحصائيات البطاقات =====
  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;
  const alertDevices = devices.filter(d => d.alert).length;

  // ===== التصيير =====
  return (
    <div className="p-6 mr-20 md:mr-64">
      {/* الهيدر */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaServer className="text-indigo-600" />
            إدارة الأجهزة
          </h1>
          <p className="text-gray-500 text-sm">مراقبة والتحكم بجميع أجهزة المنصة (شاشات، حساسات، مكيفات، أقفال)</p>
        </div>
        <Button 
          onClick={() => { setEditingDevice(null); setShowAddModal(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
        >
          <FaPlus /> إضافة جهاز
        </Button>
      </div>

      {/* ===== بطاقات الإحصائيات ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          icon={<FaServer />} 
          label="إجمالي الأجهزة" 
          value={totalDevices} 
          color="bg-indigo-100 text-indigo-700" 
        />
        <StatsCard 
          icon={<FaWifi />} 
          label="متصل" 
          value={onlineDevices} 
          color="bg-green-100 text-green-700" 
        />
        <StatsCard 
          icon={<FaWifiSlash />} 
          label="غير متصل" 
          value={offlineDevices} 
          color="bg-red-100 text-red-700" 
        />
        <StatsCard 
          icon={<FaExclamationTriangle />} 
          label="تحتاج تنبيه" 
          value={alertDevices} 
          color="bg-yellow-100 text-yellow-700" 
        />
      </div>

      {/* ===== البحث والفلترة ===== */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex-1 min-w-[200px] relative">
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث باسم الجهاز، الفرع، أو الموقع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>
        <select 
          value={filterBranch} 
          onChange={(e) => setFilterBranch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400"
        >
          {getUniqueBranches().map(b => (
            <option key={b} value={b}>{b === 'الكل' ? 'جميع الفروع' : b}</option>
          ))}
        </select>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400"
        >
          {getUniqueTypes().map(t => (
            <option key={t} value={t}>{t === 'الكل' ? 'جميع الأنواع' : t}</option>
          ))}
        </select>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400"
        >
          <option value="الكل">جميع الحالات</option>
          <option value="online">متصل</option>
          <option value="offline">غير متصل</option>
          <option value="maintenance">تحت الصيانة</option>
        </select>
      </div>

      {/* ===== جدول الأجهزة ===== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">#</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الجهاز</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الفرع / الموقع</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">النوع</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">آخر قراءة / حالة</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الحالة</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device, idx) => (
                <tr key={device.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl text-indigo-500">{device.icon}</span>
                      <div>
                        <p className="font-medium text-gray-800">{device.name}</p>
                        {device.alert && (
                          <span className="text-xs text-yellow-600 flex items-center gap-1">
                            <FaExclamationTriangle className="text-yellow-500" /> تنبيه
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{device.branch}</div>
                    <div className="text-xs text-gray-400">{device.location}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                      {device.type === 'air_quality' && 'حساس جودة هواء'}
                      {device.type === 'screen' && 'شاشة حجز'}
                      {device.type === 'ac' && 'مكيف'}
                      {device.type === 'lock' && 'قفل باب'}
                      {device.type === 'light' && 'إضاءة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="max-w-[180px] truncate" title={device.lastReading}>
                      {device.lastReading}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(device.status)}`}>
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                        device.status === 'online' ? 'bg-green-500' :
                        device.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></span>
                      {getStatusLabel(device.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewDetails(device)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                        title="عرض التفاصيل"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleEdit(device)}
                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition"
                        title="تعديل"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(device.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="حذف"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDevices.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    لا توجد أجهزة مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== مودال الإضافة/التعديل ===== */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => { setShowAddModal(false); setEditingDevice(null); }} 
        title={editingDevice ? 'تعديل جهاز' : 'إضافة جهاز جديد'}
      >
        <DevicesAddEdit 
          initialData={editingDevice} 
          onSave={handleSaveDevice} 
          onCancel={() => { setShowAddModal(false); setEditingDevice(null); }} 
        />
      </Modal>

      {/* ===== مودال التفاصيل ===== */}
      <Modal 
        isOpen={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)} 
        title="تفاصيل الجهاز"
      >
        <DeviceDetails device={selectedDevice} onClose={() => setShowDetailsModal(false)} />
      </Modal>
    </div>
  );
};

// ============================================================
// مكون بطاقة الإحصاء المساعد
// ============================================================

const StatsCard = ({ icon, label, value, color }) => {
  return (
    <div className={`${color} rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-white/20`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DevicesList;