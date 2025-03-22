const userController = require('../../backend/controllers/userController');
const userService = require('../../backend/services/userService');
jest.spyOn(console, 'error').mockImplementation(() => {});
// Mock the userService module
jest.mock('../../backend/services/userService', () => ({
  signup: jest.fn(),
  login: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  // Test - 1
  // (Requirement-ID 2 from Requirements Traceability Matrix)
  describe('signup', () => {
    it('should return 201 and success message when signup is successful', async () => {
      // Mock the userService.signup function
      userService.signup.mockResolvedValue({ success: true });

      // Mock request and response objects
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller function
      await userController.signup(req, res);

      // Assertions
      expect(userService.signup).toHaveBeenCalledWith('testuser', 'password123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    it('should return 500 and error message when signup fails', async () => {
      // Mock the userService.signup function to throw an error
      userService.signup.mockRejectedValue(new Error('Signup failed'));

      // Mock request and response objects
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller function
      await userController.signup(req, res);

      // Assertions
      expect(userService.signup).toHaveBeenCalledWith('testuser', 'password123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Signup failed' });
    });
  });

  // Test - 2
  // (Requirement-ID 1 from Requirements Traceability Matrix)
  describe('login', () => {
    it('should return 200 and user details when login is successful', async () => {
      // Mock the userService.login function
      userService.login.mockResolvedValue({ id: 1, username: 'testuser' });

      // Mock request and response objects
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller function
      await userController.login(req, res);

      // Assertions
      expect(userService.login).toHaveBeenCalledWith('testuser', 'password123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        userId: 1,
        username: 'testuser',
        message: 'Login successful',
      });
    });

    it('should return 401 and error message when login fails due to invalid credentials', async () => {
      // Mock the userService.login function to return null
      userService.login.mockResolvedValue(null);

      // Mock request and response objects
      const req = { body: { username: 'testuser', password: 'wrongpassword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller function
      await userController.login(req, res);

      // Assertions
      expect(userService.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Invalid credentials' });
    });

    it('should return 500 and error message when login fails due to server error', async () => {
      // Mock the userService.login function to throw an error
      userService.login.mockRejectedValue(new Error('Login failed'));

      // Mock request and response objects
      const req = { body: { username: 'testuser', password: 'password123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Call the controller function
      await userController.login(req, res);

      // Assertions
      expect(userService.login).toHaveBeenCalledWith('testuser', 'password123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Login failed' });
    });
  });
});
