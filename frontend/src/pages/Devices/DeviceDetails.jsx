// ============================================================
// ملف: pages/Devices/DeviceDetails.jsx
// الوظيفة: عرض تفاصيل الجهاز وقراءاته
// ============================================================

import React from 'react';
import { FaChartLine, FaClock, FaWifi, FaWifiSlash, FaTools } from 'react-icons/fa';
import Button from '../../components/UI/Button';

const DeviceDetails = ({ device, onClose }) => {
  if (!device) return null;

  const getStatusIcon = () => {
    switch (device.status) {
      case 'online': return <FaWifi className="text-green-500" />;
      case 'offline': return <FaWifiSlash className="text-red-500" />;
      case 'maintenance': return <FaTools className="text-yellow-500" />;
      default: return <FaWifi />;
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس الجهاز */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="text-5xl text-indigo-500">{device.icon}</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{device.name}</h2>
          <p className="text-gray-500">{device.branch} • {device.location}</p>
        </div>
        <div className="mr-auto flex items-center gap-2">
          {getStatusIcon()}
          <span className={`font-bold ${
            device.status === 'online' ? 'text-green-600' :
            device.status === 'offline' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {device.status === 'online' ? 'متصل' :
             device.status === 'offline' ? 'غير متصل' : 'تحت الصيانة'}
          </span>
        </div>
      </div>

      {/* معلومات الجهاز */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem label="نوع الجهاز" value={
          device.type === 'air_quality' ? 'حساس جودة هواء' :
          device.type === 'screen' ? 'شاشة حجز' :
          device.type === 'ac' ? 'مكيف' :
          device.type === 'lock' ? 'قفل باب' : 'إضاءة'
        } />
        <InfoItem label="آخر قراءة" value={device.lastReading} />
        <InfoItem label="آخر تحديث" value="منذ 5 ثوانٍ" icon={<FaClock />} />
        <InfoItem label="المعرف الفريد (Device ID)" value={`DEV-${String(device.id).padStart(4, '0')}`} />
      </div>

      {/* قراءات الحساسات (للحساسات فقط) */}
      {device.type === 'air_quality' && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-3">
            <FaChartLine className="text-indigo-500" />
            قراءات الحساسات (لحظية)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SensorReading label="CO2" value="420 ppm" status="good" />
            <SensorReading label="درجة الحرارة" value="24°C" status="good" />
            <SensorReading label="الرطوبة" value="55%" status="good" />
            <SensorReading label="جودة الهواء" value="جيدة" status="good" />
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClose}>
          إغلاق
        </Button>
      </div>
    </div>
  );
};

// ===== مكونات مساعدة =====

const InfoItem = ({ label, value, icon }) => (
  <div className="bg-gray-50 p-3 rounded-xl">
    <p className="text-xs text-gray-400 flex items-center gap-1">{icon} {label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

const SensorReading = ({ label, value, status }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-lg font-bold text-gray-800">{value}</p>
    {status === 'good' && <p className="text-xs text-green-500">✅ طبيعي</p>}
    {status === 'warning' && <p className="text-xs text-yellow-500">⚠️ مرتفع</p>}
    {status === 'danger' && <p className="text-xs text-red-500">🚨 خطر</p>}
  </div>
);

export default DeviceDetails;