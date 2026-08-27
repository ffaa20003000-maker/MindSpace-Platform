import React from 'react';
import { FaMapPin } from 'react-icons/fa';

const BranchesMapView = ({ branches }) => {
  // في الإصدار الحقيقي، سيتم استخدام Google Maps API أو Leaflet.
  // هذا مجرد عرض تجريبي لبيانات الفروع مع إحداثيات وهمية.
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-4">
        سيتم عرض الفروع على خريطة تفاعلية هنا (باستخدام Google Maps أو Leaflet).
        الإحداثيات الحالية وهمية لعرض البيانات.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-start gap-3">
            <FaMapPin className="text-indigo-500 text-2xl mt-1" />
            <div>
              <h4 className="font-bold text-gray-800">{branch.name}</h4>
              <p className="text-sm text-gray-600">{branch.city}</p>
              <p className="text-xs text-gray-400">Lat: 24.7136, Lng: 46.6753 (مثال)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesMapView;