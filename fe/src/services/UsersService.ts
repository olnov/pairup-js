const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getUsers = async (token:String) => {
    const response = await fetch(`${BACKEND_URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }else{
        throw new Error(`Invalid credentials: ${response.status}`);
    }
};

export const createUser = async (token:String, email:String, password:String, fullName:String) => {
    const response = await fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            email: email,
            password: password,
            full_name: fullName,
        }),
    });

    if (response.status === 201) {
        const data = await response.json();
        return data;
    }else{
        throw new Error(`Invalid credentials: ${response.status}`);
    };
};


