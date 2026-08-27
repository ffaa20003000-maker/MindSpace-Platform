// src/constants/roles.js
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  COMPANY_ADMIN: 'company_admin',
  BRANCH_MANAGER: 'branch_manager',
  BOOKING_SUPERVISOR: 'booking_supervisor',
  MAINTENANCE_SUPERVISOR: 'maintenance_supervisor',
  CLEANER: 'cleaner',
  END_USER: 'end_user',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'مدير المنصة',
  [ROLES.COMPANY_ADMIN]: 'مدير الشركة',
  [ROLES.BRANCH_MANAGER]: 'مدير الفرع',
  [ROLES.BOOKING_SUPERVISOR]: 'مشرف حجوزات',
  [ROLES.MAINTENANCE_SUPERVISOR]: 'مشرف صيانة',
  [ROLES.CLEANER]: 'عامل نظافة',
  [ROLES.END_USER]: 'عميل منتفع',
};

export const ROLE_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

// الصلاحيات المسموح لكل دور (مؤقت - سيتم تطبيقها في الباكند)
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.COMPANY_ADMIN]: ['manage_branches', 'manage_members', 'manage_bookings', 'view_reports'],
  [ROLES.BRANCH_MANAGER]: ['manage_rooms', 'manage_booking_supervisors', 'view_branch_reports'],
  [ROLES.BOOKING_SUPERVISOR]: ['confirm_bookings', 'cancel_bookings', 'view_occupancy'],
  [ROLES.MAINTENANCE_SUPERVISOR]: ['control_iot', 'view_sensors', 'request_cleaning'],
  [ROLES.CLEANER]: ['view_room_status', 'receive_cleaning_alerts'],
  [ROLES.END_USER]: ['book_room', 'pay', 'rate', 'control_iot_during_booking'],
};