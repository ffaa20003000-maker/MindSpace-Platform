// بيانات الإحصائيات الأساسية
export const kpiData = {
  totalCompanies: 24,
  totalBranches: 68,
  todayBookings: 134,
  revenue: '356,900',
  confirmed: 1,
  accessCount: '1,240',
  computerAnalysis: '98.4%',
};

// بيانات حساسات إنترنت الأشياء
export const iotData = {
  temperature: 28,
  humidity: 95,
  airQuality: 20,
  wasteLevel: 95,
  roomTemp: '28°C',
  zone: 'ZONE A',
};

// بيانات الرسم البياني
export const weeklyData = [
  { day: 'أحد', bookings: 12, occupancy: 45 },
  { day: 'إثن', bookings: 19, occupancy: 78 },
  { day: 'ثلاث', bookings: 15, occupancy: 62 },
  { day: 'أربع', bookings: 22, occupancy: 89 },
  { day: 'خميس', bookings: 18, occupancy: 70 },
  { day: 'جمعة', bookings: 8, occupancy: 30 },
  { day: 'سبت', bookings: 5, occupancy: 20 },
];

// بيانات آخر الحجوزات
export const recentBookings = [
  { id: 1, room: 'غرفة الاجتماعات A', user: 'أحمد محمد', time: '10:00 - 11:30', status: 'مؤكد' },
  { id: 2, room: 'مكتب المدير', user: 'سارة علي', time: '12:00 - 13:00', status: 'قيد الانتظار' },
  { id: 3, room: 'غرفة التدريب', user: 'خالد حسن', time: '14:00 - 16:00', status: 'منتهي' },
  { id: 4, room: 'غرفة الاجتماعات B', user: 'نورة سعد', time: '09:00 - 10:30', status: 'مؤكد' },
  { id: 5, room: 'مساحة مفتوحة', user: 'فيصل عمر', time: '13:00 - 15:00', status: 'قيد الانتظار' },
];