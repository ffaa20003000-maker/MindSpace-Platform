import { 
  FaBuilding, FaUsers, FaCalendarCheck, FaMoneyBillWave, 
  FaCheckCircle, FaIdCard, FaChartPie, FaBrain 
} from 'react-icons/fa';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import Sidebar from '../components/Sidebar';
import KpiCard from '../components/KpiCard';
import IoTStatusCard from '../components/IoTStatusCard';
import RecentBookingsTable from '../components/RecentBookingsTable';
import { kpiData, iotData, weeklyData, recentBookings } from '../data/mockData';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7'];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-10 mr-20 md:mr-64 overflow-y-auto">
        {/* الهيدر */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              لوحة التحكم
              <span className="text-sm font-normal text-gray-400 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
                مرصاد LIT
              </span>
            </h1>
            <p className="text-gray-500 mt-1">نظام إدارة المكاتب الذكي</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              {new Date().toLocaleDateString('ar-SA')}
            </span>
          </div>
        </div>

        {/* صف بطاقات KPI (8 بطاقات) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            icon={<FaBuilding />} 
            title="الشركات" 
            value={kpiData.totalCompanies} 
            color="bg-gradient-to-br from-blue-500 to-blue-600" 
          />
          <KpiCard 
            icon={<FaUsers />} 
            title="الفروع" 
            value={kpiData.totalBranches} 
            color="bg-gradient-to-br from-green-500 to-green-600" 
          />
          <KpiCard 
            icon={<FaCalendarCheck />} 
            title="حجوزات اليوم" 
            value={kpiData.todayBookings} 
            color="bg-gradient-to-br from-yellow-500 to-yellow-600" 
          />
          <KpiCard 
            icon={<FaMoneyBillWave />} 
            title="الإيرادات (ريال)" 
            value={kpiData.revenue} 
            color="bg-gradient-to-br from-purple-500 to-purple-600" 
          />
        </div>

        {/* صف بطاقات KPI الثانية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard 
            icon={<FaCheckCircle />} 
            title="مؤكدة" 
            value={kpiData.confirmed} 
            color="bg-gradient-to-br from-emerald-500 to-emerald-600" 
          />
          <KpiCard 
            icon={<FaIdCard />} 
            title="الوصول التالية" 
            value={kpiData.accessCount} 
            color="bg-gradient-to-br from-cyan-500 to-cyan-600" 
          />
          <KpiCard 
            icon={<FaChartPie />} 
            title="تحليل الكمبيوتر" 
            value={kpiData.computerAnalysis} 
            suffix="%" 
            color="bg-gradient-to-br from-indigo-500 to-indigo-600" 
          />
          <KpiCard 
            icon={<FaBrain />} 
            title="الذكاء الاصطناعي" 
            value="24/7" 
            color="bg-gradient-to-br from-rose-500 to-rose-600" 
          />
        </div>

        {/* بطاقات إنترنت الأشياء (IoT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <IoTStatusCard 
            type="temperature" 
            value={iotData.temperature} 
            label="درجة الحرارة" 
            subLabel="SENSOR ROOM - ZONE A" 
          />
          <IoTStatusCard 
            type="humidity" 
            value={iotData.humidity} 
            label="الرطوبة" 
            subLabel="STORAGE TANK - RIAZ" 
          />
          <IoTStatusCard 
            type="airQuality" 
            value={iotData.airQuality} 
            label="جودة الهواء" 
            subLabel="PRIVATE VPN - ZONE" 
          />
          <IoTStatusCard 
            type="waste" 
            value={iotData.wasteLevel} 
            label="مستوى النفايات" 
            subLabel="STORAGE TANK" 
          />
        </div>

        {/* الرسوم البيانية والجدول */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* خط بياني */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
              اتجاه الحجوزات والإشغال
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="occupancy" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* دائري */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
              نوعية المساحات المستخدمة
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={[
                      { name: 'مكتب خاص', value: 35 },
                      { name: 'غرفة اجتماعات', value: 45 },
                      { name: 'مساحة مفتوحة', value: 20 }
                    ]} 
                    cx="50%" 
                    cy="50%" 
                    labelLine={false} 
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} 
                    outerRadius={80} 
                    dataKey="value"
                  >
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* جدول آخر الحجوزات */}
        <RecentBookingsTable bookings={recentBookings} />
      </div>
    </div>
  );
};

export default Dashboard;