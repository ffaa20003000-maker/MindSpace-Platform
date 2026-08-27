import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaBox, FaMoneyBillWave, FaUsers, FaServer, FaBuilding } from 'react-icons/fa';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import PlansAddEdit from './PlansAddEdit';

const mockPlans = [
  { id: 1, name: 'باقة أساسية', price: 299, duration: 'شهر', maxBranches: 2, maxMembers: 10, maxDevices: 5, maxRooms: 5 },
  { id: 2, name: 'باقة متقدمة', price: 599, duration: 'شهر', maxBranches: 5, maxMembers: 25, maxDevices: 15, maxRooms: 20 },
  { id: 3, name: 'باقة احترافية', price: 999, duration: 'شهر', maxBranches: 0, maxMembers: 0, maxDevices: 0, maxRooms: 0 },
];

const PlansList = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaBox className="text-indigo-600" />
          إدارة الباقات
        </h1>
        <Button onClick={() => { setEditingPlan(null); setShowModal(true); }}>
          <FaPlus /> إضافة باقة
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => { setEditingPlan(plan); setShowModal(true); }} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(plan.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-indigo-600">{plan.price} ريال</span>
              <span className="text-sm text-gray-400">/ {plan.duration}</span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><FaBuilding className="text-indigo-400" /> {plan.maxBranches === 0 ? 'غير محدود' : `${plan.maxBranches} فروع`}</div>
              <div className="flex items-center gap-2"><FaUsers className="text-indigo-400" /> {plan.maxMembers === 0 ? 'غير محدود' : `${plan.maxMembers} عضو`}</div>
              <div className="flex items-center gap-2"><FaServer className="text-indigo-400" /> {plan.maxDevices === 0 ? 'غير محدود' : `${plan.maxDevices} جهاز`}</div>
              <div className="flex items-center gap-2"><FaBuilding className="text-indigo-400" /> {plan.maxRooms === 0 ? 'غير محدود' : `${plan.maxRooms} غرفة`}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingPlan ? 'تعديل باقة' : 'إضافة باقة جديدة'}>
        <PlansAddEdit initialData={editingPlan} onSave={(data) => {
          if (editingPlan) {
            setPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...p, ...data } : p));
          } else {
            setPlans(prev => [...prev, { id: Date.now(), ...data }]);
          }
          setShowModal(false);
        }} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default PlansList;