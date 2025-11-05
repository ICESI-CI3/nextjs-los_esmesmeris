import { jest } from '@jest/globals';

jest.mock('@/app/lib/auth/session', () => ({
  getToken: jest.fn(() => Promise.resolve('mock-token')),
  decryptSession: jest.fn(() => Promise.resolve({ user_id: 'emp1' }))
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('@/app/lib/sales/definitions', () => ({
  CreateSaleFormSchema: {
    safeParse: (data: any) => ({ success: true, data })
  }
}));

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

import { getSales, createSale } from '@/app/actions/sales/sales';

describe('Sales Module Tests', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
  const { getToken, decryptSession } = require('@/app/lib/auth/session');

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BACK_URL = 'http://localhost:3001';
    getToken.mockImplementation(() => Promise.resolve('mock-token'));
    decryptSession.mockImplementation(() => Promise.resolve({ user_id: 'emp1' }));
  });

  it('getSales devuelve lista de ventas', async () => {
    const mockSales = [
      { id: 1, totalAmount: 100 },
      { id: 2, totalAmount: 200 }
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSales),
    } as Response);
    const result = await getSales();
    expect(result).toEqual(mockSales);
  });



  it('createSale maneja error de autenticación', async () => {
    getToken.mockImplementation(() => Promise.resolve(null));
    decryptSession.mockImplementation(() => Promise.resolve({ user_id: null }));
    const saleData = { customerId: 'c1', totalAmount: 150 };
    const result = await createSale(saleData);
    expect(result).toEqual({ message: 'No autenticado. No se pudo crear la venta.', success: false });
  });

  it('createSale maneja error de red', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const saleData = { customerId: 'c1', totalAmount: 150 };
    const result = await createSale(saleData);
    expect(result).toEqual({ message: 'Error de red. No se pudo crear la venta.', success: false });
  });
});
