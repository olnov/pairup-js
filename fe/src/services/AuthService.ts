const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const login = async (email:String,password:String,remember:Boolean) => {
    const response = await fetch(`${BACKEND_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            remember: remember,
        }),
    });

    if (response.status === 200) {
        const data = await response.json();
        return { token: data.token, userId: data.userId };
    }else{
        throw new Error(`Invalid credentials: ${response.status}`);
    }
};