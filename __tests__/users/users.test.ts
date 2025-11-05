import { jest } from '@jest/globals';

// Mock de las dependencias
jest.mock('@/app/lib/auth/session', () => ({
  getToken: jest.fn(() => Promise.resolve('mock-token')),
  decryptSession: jest.fn()
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn()
  }))
}));

// Mock de fetch global
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

// Importar las funciones a probar después de los mocks
import { getUsers, getUser, updateUser, createUser, deleteUser, searchUsersByName } from '@/app/actions/users/users';

describe('Users Module Tests', () => {
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
  
  beforeEach(() => {
    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
    process.env.BACK_URL = 'http://localhost:3001';
  });

  describe('getUsers', () => {
    it('should fetch and return users list', async () => {
      const mockUsers = [
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
        { id: 2, name: 'María García', email: 'maria@example.com' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      } as Response);

      const result = await getUsers();

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }
      });
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUser', () => {
    it('should fetch and return a specific user', async () => {
      const mockUser = { id: 1, name: 'Juan Pérez', email: 'juan@example.com' };
      const userId = '1';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      } as Response);

      const result = await getUser(userId);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const formData = new FormData();
      formData.append('id', '1');
      formData.append('name', 'Juan Pérez Actualizado');
      formData.append('email', 'juan.actualizado@example.com');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      const result = await updateUser(null, formData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users/1', {
        method: 'PATCH',
        body: JSON.stringify({
          name: 'Juan Pérez Actualizado',
          email: 'juan.actualizado@example.com'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }
      });
      expect(result).toEqual({
        success: true,
        message: "The operation was completed succesfully"
      });
    });

    it('should handle update error', async () => {
      const formData = new FormData();
      formData.append('id', '1');
      formData.append('name', 'Juan Pérez');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Validation error' }),
      } as Response);

      const result = await updateUser(null, formData);

      expect(result).toEqual({
        success: false,
        message: "Invalid fields"
      });
    });
  });

  describe('createUser', () => {
    it('should create user successfully', async () => {
      const formData = new FormData();
      formData.append('name', 'Nuevo Usuario');
      formData.append('email', 'nuevo@example.com');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 3, name: 'Nuevo Usuario' }),
      } as Response);

      const result = await createUser(null, formData);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Nuevo Usuario',
          email: 'nuevo@example.com'
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }
      });
      expect(result).toEqual({
        success: true,
        message: "The operation was completed succesfully"
      });
    });

    it('should handle create error', async () => {
      const formData = new FormData();
      formData.append('name', '');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Name is required' }),
      } as Response);

      const result = await createUser(null, formData);

      expect(result).toEqual({
        success: false,
        message: "Name is required"
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const userId = '1';
      const mockResponse = { success: true, message: 'User deleted' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await deleteUser(userId);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users/1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('searchUsersByName', () => {
    it('should search users by name successfully', async () => {
      const searchName = 'Juan';
      const mockUsers = [
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com' }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      } as Response);

      const result = await searchUsersByName(searchName);

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/users?name=Juan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-token'
        }
      });
      expect(result).toEqual({
        success: true,
        data: mockUsers
      });
    });

    it('should handle search error', async () => {
      const searchName = 'Juan';

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Error' }),
      } as Response);

      const result = await searchUsersByName(searchName);

      expect(result).toEqual({
        success: false,
        message: 'Error al buscar usuarios',
        data: []
      });
    });

    it('should handle network error', async () => {
      const searchName = 'Juan';

      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await searchUsersByName(searchName);

      expect(result).toEqual({
        success: false,
        message: 'Error al buscar usuarios',
        data: []
      });
    });
  });
});
