import React, { useState, useEffect } from 'react';
import { 
  FaClock, FaUser, FaEnvelope, FaCreditCard, 
  FaSnowflake, FaLightbulb, FaDoorOpen, FaPlay,
  FaPause, FaCheckCircle, FaSpinner, FaBuilding,
  FaCalendarAlt, FaUsers, FaArrowLeft, FaArrowRight,
  FaBroom, FaNfcSymbol, FaTimes, FaIdCard // ✅ أيقونات NFC
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// ============================================================
// البيانات الوهمية (ستُربط بالباكند لاحقاً)
// ============================================================

// الإعلانات المتحركة
const adsData = [
  { id: 1, title: 'عرض خاص!', desc: 'خصم 20% على حجز الغرف قبل 12 ظهراً', color: 'from-blue-500 to-purple-600' },
  { id: 2, title: 'اجتماعات ناجحة', desc: 'غرف مجهزة بأحدث تقنيات العرض', color: 'from-emerald-500 to-teal-600' },
  { id: 3, title: 'جودة الهواء', desc: 'مراقبة لحظية لجودة الهواء في جميع الغرف', color: 'from-rose-500 to-pink-600' },
];

// الغرف المتاحة
const roomsData = [
  { id: 1, name: 'غرفة الاجتماعات A', capacity: 8, price: 120, status: 'available' },
  { id: 2, name: 'قاعة المؤتمرات', capacity: 20, price: 300, status: 'available' },
  { id: 3, name: 'غرفة الاجتماعات B', capacity: 6, price: 90, status: 'busy' },
  { id: 4, name: 'غرفة التدريب', capacity: 12, price: 180, status: 'available' },
];

// ============================================================
// المكون الرئيسي للشاشة
// ============================================================

const BookingKiosk = () => {
  const navigate = useNavigate();
  
  // ===== حالة الشاشة (Screen State) =====
  const [screenState, setScreenState] = useState('ad'); // 'ad' | 'booking' | 'info' | 'payment' | 'success' | 'iot'
  
  // ===== بيانات الحجز =====
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingTime, setBookingTime] = useState('09:00');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ===== الإعلانات =====
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adTimer, setAdTimer] = useState(8); // عد تنازلي 8 ثواني

  // ===== إنترنت الأشياء (IoT) بعد الحجز =====
  const [iotStatus, setIotStatus] = useState({
    ac: false,
    light: false,
    gate: false,
  });

  // ===== بيانات الحساسات =====
  const [sensorData, setSensorData] = useState({
    temperature: 24,
    humidity: 55,
    co2: 420,
    sanitizer: 85,
    soap: 70,
    tissues: 60,
    trash: 45,
    airQuality: 'جيدة',
  });

  // ===== حالة طلب التنظيف =====
  const [cleaningRequested, setCleaningRequested] = useState(false);

  // ===== حالة NFC =====
  const [showNfcModal, setShowNfcModal] = useState(false);
  const [nfcReading, setNfcReading] = useState(false);
  const [nfcSuccess, setNfcSuccess] = useState(false);
  const [nfcError, setNfcError] = useState('');

  // ===== مؤقت الإعلانات المتحركة =====
  useEffect(() => {
    if (screenState !== 'ad') return;

    const interval = setInterval(() => {
      setAdTimer((prev) => {
        if (prev <= 1) {
          setScreenState('booking');
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screenState]);

  // التبديل التلقائي بين الإعلانات كل 5 ثوانٍ
  useEffect(() => {
    if (screenState !== 'ad') return;
    const slideInterval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adsData.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [screenState]);

  // ===== محاكاة تحديث بيانات الحساسات =====
  useEffect(() => {
    if (screenState !== 'iot') return;

    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: Math.round(22 + Math.random() * 6),
        humidity: Math.round(50 + Math.random() * 20),
        co2: Math.round(380 + Math.random() * 80),
        sanitizer: Math.max(0, Math.min(100, prev.sanitizer - Math.random() * 2)),
        soap: Math.max(0, Math.min(100, prev.soap - Math.random() * 1.5)),
        tissues: Math.max(0, Math.min(100, prev.tissues - Math.random() * 3)),
        trash: Math.min(100, prev.trash + Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [screenState]);

  // ===== دوال التحكم =====

  // الانتقال من الإعلان إلى الحجز (بالنقر)
  const handleAdClick = () => {
    setScreenState('booking');
  };

  // اختيار غرفة
  const handleSelectRoom = (room) => {
    if (room.status === 'busy') return;
    setSelectedRoom(room);
  };

  // تأكيد الحجز والانتقال إلى نموذج المعلومات
  const handleConfirmBooking = () => {
    if (!selectedRoom) return;
    setScreenState('info');
  };

  // إرسال نموذج المعلومات والانتقال إلى الدفع
  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if (userPhone.length < 10 || !userEmail.includes('@')) {
      alert('الرجاء إدخال رقم جوال صحيح وبريد إلكتروني صحيح.');
      return;
    }
    setScreenState('payment');
  };

  // محاكاة الدفع
  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setScreenState('success');
      setTimeout(() => {
        setScreenState('iot');
      }, 3000);
    }, 2000);
  };

  // التحكم في أجهزة إنترنت الأشياء
  const toggleIoT = (key) => {
    setIotStatus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===== دالة طلب التنظيف =====
  const handleRequestCleaning = () => {
    setCleaningRequested(true);
    alert('✅ تم إرسال طلب التنظيف إلى فريق الصيانة.');
    setTimeout(() => setCleaningRequested(false), 5000);
  };

  // ===== دوال NFC =====
  const handleNfcOpen = () => {
    setShowNfcModal(true);
    setNfcReading(true);
    setNfcSuccess(false);
    setNfcError('');

    // محاكاة قراءة NFC (سيتم استبدالها بـ Web NFC API لاحقاً)
    setTimeout(() => {
      setNfcReading(false);
      // محاكاة نجاح أو فشل عشوائي
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        setNfcSuccess(true);
        // فتح الباب تلقائياً
        setIotStatus(prev => ({ ...prev, gate: true }));
        setTimeout(() => {
          setShowNfcModal(false);
          setNfcSuccess(false);
        }, 2000);
      } else {
        setNfcError('❌ فشل قراءة البطاقة. حاول مرة أخرى.');
        setTimeout(() => {
          setNfcReading(false);
          setNfcError('');
        }, 3000);
      }
    }, 3000);
  };

  // ===== عرض شاشة الإعلانات =====
  const renderAdScreen = () => {
    const ad = adsData[currentAdIndex];
    return (
      <div 
        onClick={handleAdClick}
        className={`relative w-full h-screen bg-gradient-to-br ${ad.color} cursor-pointer overflow-hidden flex items-center justify-center`}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center text-white p-8 max-w-3xl">
          <div className="text-7xl mb-6 animate-bounce">📢</div>
          <h2 className="text-6xl font-extrabold mb-4 drop-shadow-lg">{ad.title}</h2>
          <p className="text-2xl opacity-90 mb-8">{ad.desc}</p>
          <div className="flex items-center justify-center gap-4 text-xl bg-white/20 backdrop-blur-sm p-4 rounded-full w-fit mx-auto">
            <FaPlay className="animate-pulse" />
            <span>انقر للمتابعة</span>
            <span className="bg-white/30 px-4 py-1 rounded-full text-sm">
              {adTimer} ثانية
            </span>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {adsData.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentAdIndex ? 'w-10 bg-white' : 'w-2 bg-white/40'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ===== عرض شاشة الحجز =====
  const renderBookingScreen = () => {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaBuilding className="text-indigo-600" />
              حجز غرفة اجتماعات
            </h1>
            <button 
              onClick={() => setScreenState('ad')}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm flex items-center gap-2"
            >
              <FaArrowRight /> العودة للإعلانات
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {roomsData.map((room) => (
              <div
                key={room.id}
                onClick={() => handleSelectRoom(room)}
                className={`bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-all duration-300 border-2 ${
                  selectedRoom?.id === room.id 
                    ? 'border-indigo-600 shadow-xl scale-105' 
                    : room.status === 'busy' 
                      ? 'border-red-200 opacity-60 cursor-not-allowed' 
                      : 'border-transparent hover:shadow-xl hover:scale-105'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{room.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    room.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {room.status === 'available' ? 'متاحة' : 'مشغولة'}
                  </span>
                </div>
                <div className="mt-4 text-gray-600 text-sm flex flex-col gap-2">
                  <p><FaUsers className="inline ml-2 text-indigo-500" /> سعة {room.capacity} أشخاص</p>
                  <p><FaClock className="inline ml-2 text-indigo-500" /> {room.price} ريال / ساعة</p>
                </div>
                {room.status === 'available' && (
                  <div className="mt-4">
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
                      onChange={(e) => setBookingTime(e.target.value)}
                    >
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>14:00</option>
                      <option>15:00</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleConfirmBooking}
              disabled={!selectedRoom}
              className={`px-10 py-4 rounded-2xl text-xl font-bold text-white transition-all duration-300 shadow-lg ${
                selectedRoom 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 hover:shadow-2xl' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedRoom ? `تأكيد حجز ${selectedRoom.name}` : 'اختر غرفة أولاً'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===== عرض نموذج المعلومات =====
  const renderInfoScreen = () => {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-3xl font-bold text-gray-800">أدخل بياناتك</h2>
            <p className="text-gray-500 mt-2">سيتم إرسال تأكيد الحجز إلى جوالك وبريدك الإلكتروني</p>
          </div>

          <form onSubmit={handleSubmitInfo} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline ml-2 text-indigo-500" />
                رقم الجوال
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="05XXXXXXXX"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline ml-2 text-indigo-500" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl text-lg hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <FaCreditCard /> متابعة إلى الدفع
            </button>
          </form>

          <button
            onClick={() => setScreenState('booking')}
            className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> العودة للحجز
          </button>
        </div>
      </div>
    );
  };

  // ===== عرض شاشة الدفع =====
  const renderPaymentScreen = () => {
    const total = selectedRoom ? selectedRoom.price * 2 : 0;
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💳</div>
            <h2 className="text-3xl font-bold text-gray-800">الدفع الإلكتروني</h2>
            <p className="text-gray-500 mt-2">تأكيد الحجز ودفع الرسوم</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>الغرفة: {selectedRoom?.name}</span>
              <span>{selectedRoom?.price} ريال/ساعة</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>المدة: ساعتان</span>
              <span>{total} ريال</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl text-lg hover:scale-105 transition-transform duration-300 shadow-lg flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <><FaSpinner className="animate-spin" /> جاري المعالجة...</>
            ) : (
              <><FaCheckCircle /> تأكيد الدفع {total} ريال</>
            )}
          </button>

          <button
            onClick={() => setScreenState('info')}
            className="w-full mt-4 text-gray-400 hover:text-gray-600 text-sm flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> العودة
          </button>
        </div>
      </div>
    );
  };

  // ===== عرض شاشة النجاح =====
  const renderSuccessScreen = () => {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <div className="text-8xl mb-6 animate-bounce">✅</div>
          <h2 className="text-5xl font-extrabold mb-4">تم الحجز بنجاح!</h2>
          <p className="text-2xl opacity-90">جاري تحويلك إلى لوحة التحكم...</p>
          <div className="mt-8 w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  };

  // ===== عرض شاشة إنترنت الأشياء (IoT) - النسخة المطورة مع NFC =====
  const renderIoTScreen = () => {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-10 flex items-center justify-center">
        <div className="max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
          {/* الهيدر */}
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <FaBuilding /> {selectedRoom?.name || 'غرفة الاجتماعات A'}
            </h1>
            <p className="text-blue-300 mt-2">مرحباً بك! يمكنك الآن التحكم في الغرفة ومراقبة حالتها</p>
            <p className="text-sm text-gray-400 mt-1">مدة الإيجار: {bookingTime} - {parseInt(bookingTime) + 2}:00</p>
          </div>

          {/* أزرار التحكم الأساسية (مكيف، إضاءة، باب) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-5 text-center hover:bg-white/10 transition border border-white/10">
              <div className={`text-4xl mb-3 ${iotStatus.ac ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`}>
                <FaSnowflake />
              </div>
              <h3 className="text-white font-bold">مكيف الهواء</h3>
              <p className="text-sm text-gray-400 mb-3">{iotStatus.ac ? 'يعمل' : 'متوقف'}</p>
              <button onClick={() => toggleIoT('ac')} className={`w-full py-2 rounded-xl font-bold transition ${iotStatus.ac ? 'bg-red-500/80 hover:bg-red-600' : 'bg-blue-500/80 hover:bg-blue-600'} text-white`}>
                {iotStatus.ac ? 'إيقاف' : 'تشغيل'}
              </button>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 text-center hover:bg-white/10 transition border border-white/10">
              <div className={`text-4xl mb-3 ${iotStatus.light ? 'text-yellow-400 animate-pulse' : 'text-gray-500'}`}>
                <FaLightbulb />
              </div>
              <h3 className="text-white font-bold">الإضاءة</h3>
              <p className="text-sm text-gray-400 mb-3">{iotStatus.light ? 'مضاءة' : 'مطفأة'}</p>
              <button onClick={() => toggleIoT('light')} className={`w-full py-2 rounded-xl font-bold transition ${iotStatus.light ? 'bg-red-500/80 hover:bg-red-600' : 'bg-yellow-500/80 hover:bg-yellow-600'} text-white`}>
                {iotStatus.light ? 'إطفاء' : 'تشغيل'}
              </button>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 text-center hover:bg-white/10 transition border border-white/10">
              <div className={`text-4xl mb-3 ${iotStatus.gate ? 'text-green-400 animate-pulse' : 'text-gray-500'}`}>
                <FaDoorOpen />
              </div>
              <h3 className="text-white font-bold">فتح الباب</h3>
              <p className="text-sm text-gray-400 mb-3">{iotStatus.gate ? 'مفتوح' : 'مغلق'}</p>
              <button onClick={() => toggleIoT('gate')} className={`w-full py-2 rounded-xl font-bold transition ${iotStatus.gate ? 'bg-red-500/80 hover:bg-red-600' : 'bg-green-500/80 hover:bg-green-600'} text-white`}>
                {iotStatus.gate ? 'إغلاق' : 'فتح'}
              </button>
            </div>
          </div>

          {/* حساسات إنترنت الأشياء (قراءة فقط) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <SensorCard icon="🌡️" label="درجة الحرارة" value={`${sensorData.temperature}°C`} />
            <SensorCard icon="💧" label="الرطوبة" value={`${sensorData.humidity}%`} />
            <SensorCard icon="🫧" label="جودة الهواء (CO2)" value={`${sensorData.co2} ppm`} />
            <SensorCard 
              icon="🧴" 
              label="سائل التعقيم" 
              value={`${Math.round(sensorData.sanitizer)}%`} 
              color={sensorData.sanitizer < 20 ? 'text-red-400' : 'text-green-400'} 
            />
            <SensorCard 
              icon="🧼" 
              label="مستوى الصابون" 
              value={`${Math.round(sensorData.soap)}%`} 
              color={sensorData.soap < 20 ? 'text-red-400' : 'text-green-400'} 
            />
            <SensorCard 
              icon="🧻" 
              label="المناديل الورقية" 
              value={`${Math.round(sensorData.tissues)}%`} 
              color={sensorData.tissues < 20 ? 'text-red-400' : 'text-green-400'} 
            />
            <SensorCard 
              icon="🗑️" 
              label="سلة المهملات" 
              value={`${Math.round(sensorData.trash)}%`} 
              color={sensorData.trash > 80 ? 'text-red-400' : 'text-green-400'} 
            />
            <SensorCard 
              icon="🌬️" 
              label="جودة الهواء" 
              value={sensorData.airQuality} 
              color="text-green-400" 
            />
          </div>

          {/* طلب التنظيف + فتح الباب عبر NFC */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button 
              onClick={handleRequestCleaning}
              disabled={cleaningRequested}
              className={`px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-3 ${
                cleaningRequested 
                  ? 'bg-gray-500 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 text-white'
              }`}
            >
              {cleaningRequested ? (
                <><FaSpinner className="animate-spin" /> جاري الإرسال...</>
              ) : (
                <><FaBroom /> طلب تنظيف فوري</>
              )}
            </button>

            <button 
              onClick={handleNfcOpen}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 rounded-xl text-white font-bold transition shadow-lg flex items-center gap-3"
            >
              <FaNfcSymbol /> فتح الباب بـ NFC
            </button>

            <button 
              onClick={() => setScreenState('ad')} 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition font-bold border border-white/10"
            >
              العودة للشاشة الرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===== مكون مساعد لعرض بيانات الحساس =====
  const SensorCard = ({ icon, label, value, color = 'text-white' }) => (
    <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
      <div className="text-2xl">{icon}</div>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  );

  // ===== نافذة NFC المنبثقة =====
  const renderNfcModal = () => {
    if (!showNfcModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <button 
            onClick={() => setShowNfcModal(false)}
            className="float-left text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes className="text-2xl" />
          </button>

          <div className="mt-4">
            <div className="text-6xl mb-6">📱</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {nfcReading ? 'جاري قراءة البطاقة...' : nfcSuccess ? '✅ تم فتح الباب!' : 'افتح الباب عبر NFC'}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {nfcReading 
                ? 'قرب بطاقتك أو هاتفك من جهاز القراءة' 
                : nfcSuccess 
                  ? 'الباب مفتوح الآن. يمكنك الدخول.' 
                  : nfcError || 'استخدم بطاقة NFC أو تطبيق الهاتف لفتح الباب'}
            </p>

            {nfcReading && (
              <div className="flex justify-center gap-2 mb-6">
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
              </div>
            )}

            {nfcSuccess && (
              <div className="text-6xl mb-4 animate-bounce">🚪</div>
            )}

            {nfcError && (
              <div className="text-red-500 text-sm mb-4">{nfcError}</div>
            )}

            <button
              onClick={() => setShowNfcModal(false)}
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 font-bold transition"
            >
              {nfcSuccess ? 'متابعة' : 'إلغاء'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===== المحرك الرئيسي =====
  switch (screenState) {
    case 'ad': return renderAdScreen();
    case 'booking': return renderBookingScreen();
    case 'info': return renderInfoScreen();
    case 'payment': return renderPaymentScreen();
    case 'success': return renderSuccessScreen();
    case 'iot': return (
      <>
        {renderIoTScreen()}
        {renderNfcModal()}
      </>
    );
    default: return renderAdScreen();
  }
};

export default BookingKiosk;