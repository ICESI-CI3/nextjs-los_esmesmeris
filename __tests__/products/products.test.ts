import { jest } from '@jest/globals';

jest.mock('@/app/lib/auth/session', () => ({
  getToken: jest.fn(() => Promise.resolve('mock-token')),
}));

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

import { getProducts, searchProductsByName } from '@/app/actions/products/products';

describe('Products Module Tests', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BACK_URL = 'http://localhost:3001';
  });

  it('getProducts devuelve lista de productos', async () => {
    const mockProducts = [
      { id: 1, name: 'Producto A' },
      { id: 2, name: 'Producto B' }
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    } as Response);
    const result = await getProducts();
    expect(result).toEqual(mockProducts);
  });

  it('searchProductsByName devuelve productos encontrados', async () => {
    const mockProducts = [
      { id: 1, name: 'Producto A' }
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    } as Response);
    const result = await searchProductsByName('Producto A');
    expect(result).toEqual({ success: true, message: 'Productos encontrados', data: mockProducts });
  });

  it('searchProductsByName maneja error de red', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const result = await searchProductsByName('Producto X');
    expect(result).toEqual({ success: false, message: 'Error de red al buscar productos', data: null });
  });
});
