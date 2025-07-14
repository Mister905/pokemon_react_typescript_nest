import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

async function runTest() {
  try {
    console.log('🔹 Starting API test...');

    // 1️⃣ Create test user (optional, skip if user exists)
    const testUser = { username: 'testuser', password: 'testpass' };
    try {
      await axios.post(`${BASE_URL}/auth/register`, testUser);
      console.log('✅ Test user created.');
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        console.log('ℹ️ Test user already exists.');
      } else {
        throw err;
      }
    }

    // 2️⃣ Log in to get JWT
    const loginResp = await axios.post(`${BASE_URL}/auth/login`, testUser);
    const token = loginResp.data.access_token;
    console.log('✅ Logged in. JWT received.');

    const authHeaders = { Authorization: `Bearer ${token}` };

    // 3️⃣ Test /favourites endpoint
    console.log('🔹 Testing GET /favourites');
    const favsResp = await axios.get(`${BASE_URL}/favourites`, {
      headers: authHeaders,
    });
    console.log('Favourites:', favsResp.data);

    console.log('🔹 Testing POST /favourites');
    const newFav = { pokemonId: 25, pokemonName: 'Pikachu' };
    const addFavResp = await axios.post(`${BASE_URL}/favourites`, newFav, {
      headers: authHeaders,
    });
    console.log('Added favourite:', addFavResp.data);

    const favouriteId = addFavResp.data.id;

    // 4️⃣ Test /notes endpoint
    console.log('🔹 Testing POST /notes/:favouriteId');
    const noteResp = await axios.post(
      `${BASE_URL}/notes/${favouriteId}`,
      { content: 'My first note' },
      { headers: authHeaders },
    );
    console.log('Added note:', noteResp.data);

    const noteId = noteResp.data.id;

    console.log('🔹 Testing PUT /notes/:noteId');
    const updatedNoteResp = await axios.put(
      `${BASE_URL}/notes/${noteId}`,
      { content: 'Updated note content' },
      { headers: authHeaders },
    );
    console.log('Updated note:', updatedNoteResp.data);

    console.log('🔹 Testing DELETE /notes/:noteId');
    const delNoteResp = await axios.delete(`${BASE_URL}/notes/${noteId}`, {
      headers: authHeaders,
    });
    console.log('Deleted note:', delNoteResp.data);

    console.log('🔹 Testing DELETE /favourites/:favouriteId');
    const delFavResp = await axios.delete(
      `${BASE_URL}/favourites/${favouriteId}`,
      { headers: authHeaders },
    );
    console.log('Deleted favourite:', delFavResp.data);

    console.log('🎉 All tests completed successfully.');
  } catch (err: any) {
    console.error('❌ Error during test:');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Error message:', err.message);
    }
  }
}

runTest();
