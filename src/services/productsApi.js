const API_URL = 'https://dummyjson.com/products';

async function requestJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('No pudimos conectarnos con el catálogo. Revisa tu conexión e inténtalo de nuevo.');
  }
  if (!response.ok) {
    if (response.status === 404) throw new Error('No encontramos el producto solicitado.');
    throw new Error('El catálogo no está disponible en este momento. Inténtalo más tarde.');
  }
  try {
    return await response.json();
  } catch {
    throw new Error('Recibimos una respuesta inválida del catálogo.');
  }
}

function validateProducts(payload) {
  if (!payload || !Array.isArray(payload.products)) throw new Error('Recibimos una respuesta inválida del catálogo.');
  return payload.products;
}

export async function getProducts({ signal } = {}) {
  return validateProducts(await requestJson(API_URL, signal));
}

export async function getProductById(id, { signal } = {}) {
  const product = await requestJson(`${API_URL}/${encodeURIComponent(id)}`, signal);
  if (!product || typeof product !== 'object' || !product.id) throw new Error('No encontramos el producto solicitado.');
  return product;
}

export async function getProductsByCategory(category, { signal } = {}) {
  if (!category) return getProducts({ signal });
  return validateProducts(await requestJson(`${API_URL}/category/${encodeURIComponent(category)}`, signal));
}

export async function getProductCategories({ signal } = {}) {
  const categories = await requestJson(`${API_URL}/category-list`, signal);
  if (!Array.isArray(categories)) throw new Error('No pudimos cargar las categorías en este momento.');
  return categories.filter((category) => typeof category === 'string');
}