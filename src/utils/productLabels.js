const CATEGORY_LABELS = {
  laptops: 'Portátiles',
  'mobile-accessories': 'Accesorios para móviles',
  smartphones: 'Smartphones',
  tablets: 'Tablets',
};

export function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || 'Tecnología';
}
