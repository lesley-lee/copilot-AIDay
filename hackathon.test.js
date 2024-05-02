const request = require('supertest');
const app = require('./app');


// Write the test
describe('PUT /api/negeri/:id', () => {
  it('should update the state with id:2', async () => {
    const newStateName = 'Johor Lama';
    const response = await request(app)
      .put('/api/negeri/2')
      .send({ name: newStateName })
      .expect(200);

    // Now, get the list of states and find the state with id:2
    const getResponse = await request(app).get('/api/negeri');
    if (getResponse.status == 200) {
        //console.log(getResponse.body);
        const updatedState = getResponse.body.find(state => state.id === 2);
        // Check if the name of the state with id:2 was updated
        expect(updatedState.name).toEqual(newStateName);
    }
    //const updatedState = getResponse.body.find(state => state.id === 2);
    // Check if the name of the state with id:2 was updated
    //expect(updatedState.name).toEqual(newStateName);
  });
});
