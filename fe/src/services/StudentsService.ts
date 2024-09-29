const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getStudents = async (token:String)=> {
    const response = await fetch(`${BACKEND_URL}/students`,{
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
}