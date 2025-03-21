const storyService = require('../../backend/services/storyService');
const db = require('../../backend/config/db'); // Mock or use a test database
const storyRepository = require('../../backend/repositories/storyRepository');

// Mock the database and repository
jest.mock('../../backend/config/db', () => ({
  query: jest.fn(), // Mock the database query function
}));

jest.mock('../../backend/repositories/storyRepository', () => ({
  saveStory: jest.fn(),
  deleteStoryById: jest.fn(),
}));

jest.setTimeout(30000); // Set timeout to 30 seconds
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Story Service - Actual Implementation', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should fetch stories by user ID', async () => {
    // Mock the database query
    db.query.mockImplementation((sql, params, callback) => {
      callback(null, [
        { id: 1, title: 'Story 1' },
        { id: 2, title: 'Story 2' },
      ]);
    });

    // Call the service function
    const result = await storyService.getStoriesByUserId(1);

    // Assertions
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM stories WHERE user_id = ?'),
      [1],
      expect.any(Function)
    );
    expect(result).toEqual([
      { id: 1, title: 'Story 1' },
      { id: 2, title: 'Story 2' },
    ]);
  });

  it('should return an empty array when no stories exist for the given userId', async () => {
    // Mock the db.query function to return an empty result
    db.query.mockImplementation((sql, params, callback) => {
      callback(null, []); // Simulate no stories found
    });

    // Call the function with a non-existent userId
    const userId = 999; // Assume this userId does not exist
    const result = await storyService.getStoriesByUserId(userId);

    // Assertions
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM stories WHERE user_id = ?'),
      [userId],
      expect.any(Function)
    );
    expect(result).toEqual([]); // Expect an empty array
  });

  it('should throw an error if the database query fails', async () => {
    // Mock the db.query function to simulate a database error
    db.query.mockImplementation((sql, params, callback) => {
      callback(new Error('Database error'), null);
    });

    // Call the function and expect it to throw an error
    const userId = 999; // Assume this userId does not exist
    await expect(storyService.getStoriesByUserId(userId)).rejects.toThrow('Database error');

    // Assertions
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM stories WHERE user_id = ?'),
      [userId],
      expect.any(Function)
    );
  });

  it('should save a story to the database', async () => {
    // Mock the repository function
    storyRepository.saveStory.mockResolvedValue({ success: true });

    // Call the service function
    const result = await storyService.saveStory(
      1,
      'My Story',
      'short',
      'fantasy',
      'A short fantasy story',
      'This is the story content.'
    );

    // Assertions
    expect(storyRepository.saveStory).toHaveBeenCalledWith(
      1,
      'My Story',
      'short',
      'fantasy',
      'A short fantasy story',
      'This is the story content.'
    );
    expect(result).toEqual({ success: true });
  });

  it('should delete a story by ID', async () => {
    // Mock the repository function
    storyRepository.deleteStoryById.mockResolvedValue({ success: true });

    // Call the service function
    const result = await storyService.deleteStoryById(1);

    // Assertions
    expect(storyRepository.deleteStoryById).toHaveBeenCalledWith(1);
    expect(result).toEqual({ success: true });
  });

  it('should throw an error while deleteing a story when the ID does not exist', async() => {
    // Mock the repository function
    storyRepository.deleteStoryById.mockRejectedValue(new Error("Error in deleteStoryById service:"));

    // Assertions
    await expect(storyService.deleteStoryById(1)).rejects.toThrow("Error in deleteStoryById service:");
  });

  it('should generate a story prompt and return a test story', async () => {
    // Define test inputs
    const storyTitle = 'My Story';
    const storyLength = 'short';
    const storyGenre = 'fantasy';
    const storyDescription = 'A short fantasy story';

    // Call the generate method
    const result = await storyService.generate(
      storyTitle,
      storyLength,
      storyGenre,
      storyDescription
    );

    // Assertions
    expect(result).toBe('This is a test story.');
  });

  it('should throw an error when invalid parameters are provided', async () => {
    // Define invalid test inputs
    const storyTitle = ''; // Invalid: empty title
    const storyLength = null; // Invalid: null length
    const storyGenre = undefined; // Invalid: undefined genre
    const storyDescription = ''; // Invalid: empty description

    // Assertions
    await expect(
      storyService.generate(storyTitle, storyLength, storyGenre, storyDescription)
    ).rejects.toThrow('Invalid parameters provided');
  });

  it('should log the correct prompt to the console', async () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Define test inputs
    const storyTitle = 'Adventure Story';
    const storyLength = 'long';
    const storyGenre = 'adventure';
    const storyDescription = 'An epic adventure story';

    // Call the generate method
    await storyService.generate(
      storyTitle,
      storyLength,
      storyGenre,
      storyDescription
    );

    // Assertions
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending prompt to Gemini API:',
      'Write an up to long word story in a adventure style titled "Adventure Story" based on the following description: "An epic adventure story". Respond with only the story.'
    );

    // Restore the console spy
    consoleSpy.mockRestore();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});