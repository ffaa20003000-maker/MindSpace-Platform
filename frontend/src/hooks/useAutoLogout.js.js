// src/hooks/useAutoLogout.js
import { useEffect, useRef } from 'react';

/**
 * هوك لإخراج المستخدم تلقائياً بعد فترة محددة من عدم النشاط.
 * @param {number} timeoutSeconds - مدة الانتظار بالثواني (افتراضي 20).
 * @param {function} onLogout - الدالة التي تُستدعى عند انتهاء المهلة.
 * @param {number} warningSeconds - عدد الثواني قبل الإنتهاء لعرض تحذير (افتراضي 10).
 */
const useAutoLogout = (timeoutSeconds = 20, onLogout, warningSeconds = 10) => {
  const timerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const isWarningShown = useRef(false);

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    isWarningShown.current = false;
  };

  const resetTimer = () => {
    clearTimers();
    if (!onLogout) return;

    // عرض تحذير قبل 10 ثوانٍ من إنتهاء المهلة (إذا كانت المهلة > warningSeconds)
    if (timeoutSeconds > warningSeconds) {
      warningTimerRef.current = setTimeout(() => {
        isWarningShown.current = true;
        // هنا يمكن إظهار رسالة تحذير عبر حدث مخصص أو استدعاء callback
        // سنطلق حدث 'autoLogoutWarning' لالتقاطه في المكونات
        window.dispatchEvent(new CustomEvent('autoLogoutWarning', { 
          detail: { remaining: warningSeconds } 
        }));
      }, (timeoutSeconds - warningSeconds) * 1000);
    }

    // المهلة الأساسية للخروج
    timerRef.current = setTimeout(() => {
      // التحقق من وجود تفاعل حديث (اختياري)
      if (onLogout) {
        onLogout();
      }
    }, timeoutSeconds * 1000);
  };

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'touchstart', 'mousemove', 'scroll', 'click'];
    
    const handleActivity = () => {
      // إعادة تعيين المؤقت عند أي نشاط
      resetTimer();
      // إذا كان التحذير معروضاً، نرسل حدث إلغاء
      if (isWarningShown.current) {
        window.dispatchEvent(new CustomEvent('autoLogoutCancel'));
        isWarningShown.current = false;
      }
    };

    // إضافة مستمعات الأحداث
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // بدء المؤقت فور تحميل المكون
    resetTimer();

    // التنظيف عند فك المكون
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimers();
    };
  }, [timeoutSeconds, onLogout, warningSeconds]);

  // دالة لإعادة تعيين المؤقت يدوياً (تُستخدم عند تغيير الشاشة أو إجراء مهمة)
  const refreshTimer = resetTimer;

  return { refreshTimer };
};

export default useAutoLogout;