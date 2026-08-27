import { useEffect, useRef, useState } from 'react';

const KpiCard = ({ icon, title, value, color, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const target = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const animate = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      requestAnimationFrame(animate);
    };
    animate();
  }, [value]);

  const displayValue = typeof value === 'string' && value.includes(',') 
    ? count.toLocaleString() 
    : count;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6 flex items-center gap-4 hover:shadow-xl transition-all duration-300 group">
      <div className={`${color} p-4 rounded-xl text-white text-2xl group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">
          {displayValue}{suffix}
        </p>
      </div>
    </div>
  );
};

export default KpiCard;