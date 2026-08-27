import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt, FaBuilding, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // محاكاة تسجيل الدخول (سنربطها بالباكند لاحقاً)
    setTimeout(() => {
      setLoading(false);
      // في الواقع، سنتحقق من صلاحيات المستخدم هنا
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      {/* خلفية مزخرفة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
        {/* الشعار */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaBuilding className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">منصة MindSpace</h1>
          <p className="text-blue-200 mt-1 text-sm">نظام إدارة المكاتب الذكي</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-xs text-white/70">
            <FaShieldAlt className="text-green-300" /> بوابة الإدارة
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@company.com"
                className="w-full pr-12 pl-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pr-12 pl-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/60 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/30 bg-white/10 text-indigo-500 focus:ring-indigo-400"
              />
              تذكرني
            </label>
            <a href="#" className="text-blue-300 hover:text-blue-100 transition">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                جاري التحقق...
              </>
            ) : (
              <>
                <FaSignInAlt /> دخول
              </>
            )}
          </button>
        </form>

        {/* تذييل */}
        <div className="mt-8 text-center text-white/40 text-xs">
          <p>© {new Date().getFullYear()} MindSpace Platform v2.0</p>
          <p className="mt-1">مرصاد LIT • نظام إدارة المستندات الكلية</p>
        </div>
      </div>
    </div>
  );
};

export default Login;