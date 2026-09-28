export function validateCheckoutFields(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Ingresa tu nombre.';
  if (!fields.email.trim()) errors.email = 'Ingresa tu correo electrónico.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = 'Ingresa un correo electrónico válido.';
  if (!fields.address.trim()) errors.address = 'Ingresa una dirección de envío.';
  return errors;
}
