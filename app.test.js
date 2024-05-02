const fs = require('fs');
const request = require('supertest');
const app = require('./app');

describe('app.js', () => {
  describe('GET /api/', () => {
    it('should return "Salam Malaysia Madani!!"', async () => {
      const response = await request(app).get('/api/');
      expect(response.status).toBe(200);
      expect(response.body).toBe('Salam Malaysia Madani!!');
    });
  });

  describe('GET /api/negeri', () => {
    it('should return the JSON data from negeri.json', async () => {
      const response = await request(app).get('/api/negeri');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
    });
  });

  describe('POST /api/negeri', () => {
    it('should add a new state to negeri.json', async () => {
      const newNegeri = { name: 'New State' };
      const response = await request(app)
        .post('/api/negeri')
        .send(newNegeri);
      expect(response.status).toBe(200);
      expect(response.text).toBe('State added successfully');

      // Verify that the new state is added to negeri.json
      const data = fs.readFileSync('negeri.json', 'utf8');
      const negeri = JSON.parse(data);
      expect(negeri).toContainEqual(newNegeri);
    });

    it('should return 500 Internal Server Error if file reading or writing fails', async () => {
      // Mock fs.readFile to simulate an error //
      jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
        callback(new Error('File read error'));
      });

      const newNegeri = { name: 'New State' };
      const response = await request(app)
        .post('/api/negeri')
        .send(newNegeri);
      expect(response.status).toBe(500);
      expect(response.text).toBe('Internal Server Error');

      // Restore the original implementation of fs.readFile
      fs.readFile.mockRestore();
    });
  });
});