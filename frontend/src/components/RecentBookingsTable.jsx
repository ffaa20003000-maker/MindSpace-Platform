const RecentBookingsTable = ({ bookings }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'مؤكد': return 'bg-green-100 text-green-700 border-green-300';
      case 'قيد الانتظار': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'منتهي': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6">
      <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
        آخر الحجوزات
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 text-sm font-medium text-gray-500">الغرفة</th>
              <th className="pb-3 text-sm font-medium text-gray-500">المستخدم</th>
              <th className="pb-3 text-sm font-medium text-gray-500">الوقت</th>
              <th className="pb-3 text-sm font-medium text-gray-500">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 text-sm font-medium">{booking.room}</td>
                <td className="py-3 text-sm text-gray-600">{booking.user}</td>
                <td className="py-3 text-sm text-gray-600">{booking.time}</td>
                <td className="py-3 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookingsTable;