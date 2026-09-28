import assert from 'node:assert/strict';
import test from 'node:test';
import { validateCheckoutFields } from '../src/utils/checkoutValidation.js';

test('requires a name, valid email, and shipping address', () => {
  assert.deepEqual(validateCheckoutFields({ name: '', email: 'invalid', address: ' ' }), {
    name: 'Ingresa tu nombre.',
    email: 'Ingresa un correo electrónico válido.',
    address: 'Ingresa una dirección de envío.',
  });
});

test('accepts valid checkout contact and shipping details', () => {
  assert.deepEqual(validateCheckoutFields({
    name: 'Ana García',
    email: 'ana@example.com',
    address: 'Av. Central 123',
  }), {});
});
