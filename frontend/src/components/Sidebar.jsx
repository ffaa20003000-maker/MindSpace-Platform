import { 
  FaTachometerAlt, FaSitemap, FaServer, FaNetworkWired, 
  FaUsersCog, FaBrain, FaBell, FaChartLine, FaShieldAlt, 
  FaPlug, FaFileInvoice, FaCog, FaBox
} from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { id: 1, label: 'لوحة التحكم', icon: <FaTachometerAlt />, path: '/dashboard' },
  { id: 2, label: 'إدارة الهيكل (Org)', icon: <FaSitemap />, path: '/org' },
  { id: 3, label: 'إدارة المستخدمين (Identity)', icon: <FaUsersCog />, path: '/users-management' },
  { id: 4, label: 'إدارة الشبكات (Network)', icon: <FaNetworkWired />, path: '/networks' },
  { id: 5, label: 'إدارة الأجهزة (Devices)', icon: <FaServer />, path: '/devices' },
  { id: 6, label: 'الذكاء الاصطناعي (AI)', icon: <FaBrain />, path: '/ai' },
  { id: 7, label: 'نظام التنبيهات (Alert)', icon: <FaBell />, path: '/alerts' },
  { id: 8, label: 'التحليلات (Analytics)', icon: <FaChartLine />, path: '/analytics' },
  { id: 9, label: 'الأمن والحماية (Security)', icon: <FaShieldAlt />, path: '/security' },
  { id: 10, label: 'بوابة التكامل (Integration)', icon: <FaPlug />, path: '/integration' },
  { id: 11, label: 'الفواتير والمالية (Billing)', icon: <FaFileInvoice />, path: '/billing' },
  { id: 12, label: 'الباقات', icon: <FaBox />, path: '/plans' },
  { id: 13, label: 'الإعدادات (Settings)', icon: <FaCog />, path: '/settings' },
];

const Sidebar = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <div className="w-20 md:w-64 bg-gradient-to-b from-indigo-900/95 to-indigo-800/95 backdrop-blur-md text-white h-screen fixed right-0 top-0 shadow-2xl flex flex-col z-50 transition-all duration-300 border-l border-white/10">
      <div className="p-5 border-b border-white/10 hidden md:block">
        <h2 className="text-xl font-extrabold tracking-tight text-center">
          Mind<span className="text-blue-300">Space</span>
        </h2>
        <p className="text-[10px] text-white/30 mt-1">مرصاد LIT • v2.0.1</p>
      </div>

      <div className="p-3 md:p-4 flex flex-col gap-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
              activeId === item.id 
                ? 'bg-white/20 shadow-lg scale-105 border-r-4 border-blue-400' 
                : 'hover:bg-white/10'
            }`}
          >
            <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
              {item.icon}
            </span>
            <span className={`${activeId === item.id ? 'font-bold' : ''} hidden md:block text-sm`}>
              {item.label}
            </span>
            {activeId === item.id && (
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-auto hidden md:block"></span>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 text-center hidden md:block">
        <p className="text-xs text-white/40">© {new Date().getFullYear()} MindSpace Platform</p>
      </div>
    </div>
  );
};

export default Sidebar;