import { FaThermometerHalf, FaTint, FaWind, FaTrashAlt } from 'react-icons/fa';

const IoTStatusCard = ({ type, value, label, subLabel, color, icon }) => {
  const getIcon = () => {
    switch (type) {
      case 'temperature': return <FaThermometerHalf className="animate-pulse" />;
      case 'humidity': return <FaTint className="animate-bounce" />;
      case 'airQuality': return <FaWind className="animate-pulse" />;
      case 'waste': return <FaTrashAlt className="animate-pulse" />;
      default: return icon;
    }
  };

  const getStatusColor = () => {
    if (type === 'temperature' && value > 35) return 'text-red-500';
    if (type === 'humidity' && value > 80) return 'text-blue-500';
    if (type === 'airQuality' && value < 30) return 'text-yellow-500';
    return color || 'text-gray-700';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-5 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className={`text-3xl ${getStatusColor()} ${type === 'humidity' ? 'animate-bounce' : 'animate-pulse'}`}>
          {getIcon()}
        </div>
        <span className="text-sm text-gray-400">{subLabel}</span>
      </div>
      <div className="mt-3">
        <p className={`text-3xl font-bold ${getStatusColor()}`}>
          {value}{type === 'temperature' ? '°C' : type === 'humidity' ? '%' : type === 'airQuality' ? '%' : ''}
        </p>
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-xs text-gray-400 mt-1">{subLabel}</p>
      </div>
    </div>
  );
};

export default IoTStatusCard;