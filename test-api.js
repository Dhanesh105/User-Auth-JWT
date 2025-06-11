const axios = require('axios');

async function testAPI() {
    try {
        console.log('🧪 Testing API endpoints...\n');

        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get('http://localhost:5000/health');
        console.log('✅ Health check:', healthResponse.data);

        // Test registration
        console.log('\n2. Testing user registration...');
        const registerData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'Test123',
            confirmpassword: 'Test123'
        };
        
        try {
            const registerResponse = await axios.post('http://localhost:5000/register', registerData);
            console.log('✅ Registration successful:', registerResponse.data);
        } catch (regError) {
            if (regError.response?.data?.message?.includes('already exists')) {
                console.log('ℹ️  User already exists, that\'s expected for testing');
            } else {
                console.log('❌ Registration error:', regError.response?.data || regError.message);
            }
        }

        // Test login
        console.log('\n3. Testing user login...');
        const loginData = {
            email: 'test@example.com',
            password: 'Test123'
        };
        
        const loginResponse = await axios.post('http://localhost:5000/login', loginData);
        console.log('✅ Login successful:', loginResponse.data);
        
        const token = loginResponse.data.token;

        // Test protected route
        console.log('\n4. Testing protected profile endpoint...');
        const profileResponse = await axios.get('http://localhost:5000/myprofile', {
            headers: {
                'x-token': token
            }
        });
        console.log('✅ Profile fetch successful:', profileResponse.data);

        console.log('\n🎉 All API tests passed!');

    } catch (error) {
        console.error('❌ API test failed:', error.response?.data || error.message);
    }
}

testAPI();
