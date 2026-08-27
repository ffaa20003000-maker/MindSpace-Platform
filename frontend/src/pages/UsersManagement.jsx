import React, { useState } from 'react';
import { 
  FaBuilding, FaLayerGroup, FaMapMarkerAlt, 
  FaUsersCog, FaUserFriends, FaChevronDown 
} from 'react-icons/fa';

// استيراد المكونات الفرعية (سنكتبها في نفس الملف لتقليل عدد الملفات)
import CompaniesList from './Companies/CompaniesList';
import GroupsList from './Groups/GroupsList';
import BranchesList from './Branches/BranchesList';
import MembersList from './Members/MembersList';
import EndUsersList from './EndUsers/EndUsersList';

const tabs = [
  { id: 'companies', label: 'الشركات', icon: <FaBuilding /> },
  { id: 'groups', label: 'المجموعات', icon: <FaLayerGroup /> },
  { id: 'branches', label: 'الفروع', icon: <FaMapMarkerAlt /> },
  { id: 'members', label: 'الأعضاء', icon: <FaUsersCog /> },
  { id: 'end-users', label: 'العملاء', icon: <FaUserFriends /> },
];

const UsersManagement = () => {
  const [activeTab, setActiveTab] = useState('companies');

  const renderContent = () => {
    switch (activeTab) {
      case 'companies': return <CompaniesList />;
      case 'groups': return <GroupsList />;
      case 'branches': return <BranchesList />;
      case 'members': return <MembersList />;
      case 'end-users': return <EndUsersList />;
      default: return <CompaniesList />;
    }
  };

  return (
    <div className="p-6 mr-20 md:mr-64">
      {/* الهيدر */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUsersCog className="text-indigo-600" />
          إدارة المستخدمين (Identity)
        </h1>
        <p className="text-gray-500 text-sm">إدارة الشركات، المجموعات، الفروع، الأعضاء، والعملاء في مكان واحد</p>
      </div>

      {/* علامات التبويب */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* المحتوى الديناميكي */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default UsersManagement;