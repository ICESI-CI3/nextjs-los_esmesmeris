import { jest } from '@jest/globals';

jest.mock('@/app/lib/auth/session', () => ({
  getToken: jest.fn(() => Promise.resolve('mock-token')),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('@/app/lib/customers/definition', () => ({
  CreateCustomerFormSchema: {
    safeParse: (data: any) => ({ success: true, data })
  }
}));

global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

import { getCustomers, getCustomerByCardId } from '@/app/actions/customers/customers';

describe('Customers Module Tests', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
  const { getToken } = require('@/app/lib/auth/session');

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BACK_URL = 'http://localhost:3001';
    getToken.mockImplementation(() => Promise.resolve('mock-token'));
  });

  it('getCustomers devuelve lista de clientes', async () => {
    const mockCustomers = [
      { id: 1, name: 'Cliente A' },
      { id: 2, name: 'Cliente B' }
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCustomers),
    } as Response);
    const result = await getCustomers();
    expect(result).toEqual(mockCustomers);
  });

  it('getCustomerByCardId devuelve error si no hay token', async () => {
    getToken.mockImplementation(() => Promise.resolve(null));
    const result = await getCustomerByCardId('123');
    expect(result).toEqual({ success: false, message: 'No autenticado.' });
  });

  it('getCustomerByCardId devuelve error si no hay cédula', async () => {
    const result = await getCustomerByCardId('');
    expect(result).toEqual({ success: false, message: 'La cédula es requerida.' });
  });

  it('getCustomerByCardId devuelve cliente si todo está bien', async () => {
    const mockCustomer = { id: 1, name: 'Cliente A' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCustomer),
    } as Response);
    const result = await getCustomerByCardId('123');
    expect(result).toEqual({ success: true, data: mockCustomer });
  });
});
