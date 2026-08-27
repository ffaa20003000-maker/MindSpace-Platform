// src/constants/spaceTypes.js
export const SPACE_TYPES = [
  { id: 'office', label: 'مكتب إداري', icon: '🏢' },
  { id: 'meeting_room', label: 'غرفة اجتماعات', icon: '👥' },
  { id: 'studio', label: 'استوديو تصوير', icon: '📸' },
  { id: 'open_space', label: 'مساحة مفتوحة', icon: '🌿' },
  { id: 'training_room', label: 'غرفة تدريب', icon: '📚' },
  { id: 'restroom', label: 'دورة مياه', icon: '🚻' },
];

export const SPACE_TYPE_OPTIONS = SPACE_TYPES.map(space => ({
  value: space.id,
  label: `${space.icon} ${space.label}`,
}));