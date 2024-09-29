const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getSpecialisms = async (token:String) => {
    const response =await fetch(`${BACKEND_URL}/specialisms`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }else{
        throw new Error(`Invalid credentials: ${response.status}`);
    }
};

export const createSpecialism = async (token:String, title:String, stack:String) => {
    const response = await fetch(`${BACKEND_URL}/specialisms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: title,
            stack: stack,
        }),
    });

    if (response.status === 201) {
        const data = await response.json();
        return data;
    }
    else{
        throw new Error(`Invalid credentials: ${response.status}`);
    }
}