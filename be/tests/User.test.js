
const userController = require('../controllers/User'); 
const User = require('../models/User'); 
const httpMocks = require('node-mocks-http');

// Mock the User model methods
jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user and return 201 status', async () => {
      const req = httpMocks.createRequest({
        body: {
          full_name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        },
      });
      const res = httpMocks.createResponse();
      const newUser = { id: 1, ...req.body };

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(newUser);

      await userController.createUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(User.create).toHaveBeenCalledWith({
        full_name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        registered_at: expect.any(Date),
      });
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: 'New user created successfully.',
        userId: 1,
      });
    });

    it('should return 409 if email already exists', async () => {
      const req = httpMocks.createRequest({
        body: {
          full_name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password123',
        },
      });
      const res = httpMocks.createResponse();

      User.findOne.mockResolvedValue({ id: 2, email: 'jane@example.com' });

      await userController.createUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'jane@example.com' } });
      expect(User.create).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(409);
      expect(res._getJSONData()).toEqual({ message: 'Email already exists.' });
    });

    it('should handle errors and return 500', async () => {
      const req = httpMocks.createRequest({
        body: {
          full_name: 'Error User',
          email: 'error@example.com',
          password: 'password123',
        },
      });
      const res = httpMocks.createResponse();

      User.findOne.mockRejectedValue(new Error('Database error'));

      await userController.createUser(req, res);

      expect(User.findOne).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: 'Error creating user:',
        error: 'Database error',
      });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users with 200 status', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const users = [{ id: 1, full_name: 'John Doe', email: 'john@example.com' }];

      User.findAll.mockResolvedValue(users);

      await userController.getAllUsers(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(users);
    });

    it('should handle errors and return 500', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      User.findAll.mockRejectedValue(new Error('Database error'));

      await userController.getAllUsers(req, res);

      expect(User.findAll).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: 'Error retreiving users:',
        error: 'Database error',
      });
    });
  });

  describe('getUserById', () => {
    it('should return user by id with 200 status', async () => {
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      const user = { id: 1, full_name: 'John Doe', email: 'john@example.com' };

      User.findByPk.mockResolvedValue(user);

      await userController.getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith('1');
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(user);
    });

    it('should return 404 if user not found', async () => {
      const req = httpMocks.createRequest({ params: { id: '99' } });
      const res = httpMocks.createResponse();

      User.findByPk.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith('99');
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'User not found. ' });
    });

    it('should handle errors and return 500', async () => {
      const req = httpMocks.createRequest({ params: { id: 'error' } });
      const res = httpMocks.createResponse();

      User.findByPk.mockRejectedValue(new Error('Database error'));

      await userController.getUserById(req, res);

      expect(User.findByPk).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: 'Error retreining user:',
        error: 'Database error',
      });
    });
  });

  describe('updateUserById', () => {
    it('should update user and return 200 status', async () => {
        const req = httpMocks.createRequest({
          params: { id: '1' },
          body: { full_name: 'John Updated', email: 'john.updated@example.com' },
        });
        const res = httpMocks.createResponse();
        const user = {
          id: 1,
          full_name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          update: jest.fn().mockImplementation(function (updates) {
            Object.assign(this, updates);
            return Promise.resolve(this);
          }),
        };
      
        User.findByPk.mockResolvedValue(user);
        User.findOne.mockResolvedValue(null);
      
        await userController.updateUserById(req, res);
      
        expect(User.findByPk).toHaveBeenCalledWith('1');
        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john.updated@example.com' } });
        expect(user.update).toHaveBeenCalledWith({
          full_name: 'John Updated',
          email: 'john.updated@example.com',
          password: 'password123',
        });
        expect(res.statusCode).toBe(200);
      
        expect(res._getJSONData()).toMatchObject({
          message: 'Updated successfully.',
          user: {
            id: 1,
            full_name: 'John Updated',
            email: 'john.updated@example.com',
            password: 'password123',
          },
        });      
    });

    it('should return 404 if user not found', async () => {
      const req = httpMocks.createRequest({ params: { id: '99' }, body: {} });
      const res = httpMocks.createResponse();

      User.findByPk.mockResolvedValue(null);

      await userController.updateUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith('99');
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'User not found. ' });
    });

    it('should return 409 if email already exists', async () => {
      const req = httpMocks.createRequest({
        params: { id: '1' },
        body: { email: 'existing@example.com' },
      });
      const res = httpMocks.createResponse();
      const user = { id: 1, email: 'john@example.com', update: jest.fn() };

      User.findByPk.mockResolvedValue(user);
      User.findOne.mockResolvedValue({ id: 2, email: 'existing@example.com' });

      await userController.updateUserById(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'existing@example.com' } });
      expect(user.update).not.toHaveBeenCalled();
      expect(res.statusCode).toBe(409);
      expect(res._getJSONData()).toEqual({ message: 'Email already exists.' });
    });

    it('should handle errors and return 500', async () => {
      const req = httpMocks.createRequest({ params: { id: 'error' }, body: {} });
      const res = httpMocks.createResponse();

      User.findByPk.mockRejectedValue(new Error('Database error'));

      await userController.updateUserById(req, res);

      expect(User.findByPk).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: 'Error updating user: ',
        error: 'Database error',
      });
    });
  });

  describe('deleteUserById', () => {
    it('should delete user and return 200 status', async () => {
      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();
      const user = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(),
      };

      User.findByPk.mockResolvedValue(user);

      await userController.deleteUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith('1');
      expect(user.destroy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({ message: 'User deleted successfully.' });
    });

    it('should return 404 if user not found', async () => {
      const req = httpMocks.createRequest({ params: { id: '99' } });
      const res = httpMocks.createResponse();

      User.findByPk.mockResolvedValue(null);

      await userController.deleteUserById(req, res);

      expect(User.findByPk).toHaveBeenCalledWith('99');
      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: 'User not found.' });
    });

    it('should handle errors and return 500', async () => {
      const req = httpMocks.createRequest({ params: { id: 'error' } });
      const res = httpMocks.createResponse();

      User.findByPk.mockRejectedValue(new Error('Database error'));

      await userController.deleteUserById(req, res);

      expect(User.findByPk).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res._getJSONData()).toEqual({
        message: 'Error deleting user:',
        error: 'Database error',
      });
    });
  });
});
