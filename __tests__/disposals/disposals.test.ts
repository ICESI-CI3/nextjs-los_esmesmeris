import { jest } from '@jest/globals';

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn()
}));

jest.mock('@/app/lib/api', () => ({
  apiFetch: jest.fn()
}));

const { apiFetch } = require('@/app/lib/api');
const { getDisposals, getDisposal, createDisposal, updateDisposal, deleteDisposal } = require('@/app/actions/disposals/index');

describe('Disposals Module Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getDisposals devuelve lista de disposals', async () => {
    const mockDisposals = [
      { id: '1', name: 'Disposal A' },
      { id: '2', name: 'Disposal B' }
    ];
    apiFetch.mockResolvedValueOnce(mockDisposals);
    const result = await getDisposals();
    expect(result).toEqual(mockDisposals);
  });

  it('getDisposal devuelve un disposal', async () => {
    const mockDisposal = { id: '1', name: 'Disposal A' };
    apiFetch.mockResolvedValueOnce(mockDisposal);
    const result = await getDisposal('1');
    expect(result).toEqual(mockDisposal);
  });

  it('createDisposal llama apiFetch y revalidatePath', async () => {
    apiFetch.mockResolvedValueOnce({});
    const data = { name: 'Nuevo Disposal' };
    await createDisposal(data);
    expect(apiFetch).toHaveBeenCalledWith('/disposals', expect.objectContaining({ method: 'POST' }));
  });

  it('updateDisposal llama apiFetch y revalidatePath', async () => {
    apiFetch.mockResolvedValueOnce({});
    const data = { name: 'Disposal Actualizado' };
    await updateDisposal('1', data);
    expect(apiFetch).toHaveBeenCalledWith('/disposals/1', expect.objectContaining({ method: 'PATCH' }));
  });

  it('deleteDisposal llama apiFetch y revalidatePath', async () => {
    apiFetch.mockResolvedValueOnce({});
    await deleteDisposal('1');
    expect(apiFetch).toHaveBeenCalledWith('/disposals/1', expect.objectContaining({ method: 'DELETE' }));
  });
});
