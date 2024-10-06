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
        throw new Error(`Error: ${response.status}`);
    }
}

export const createStudent = async (token:String, fullName:String, email:String, skillLevel:String, cohortId:String) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            full_name: fullName,
            email: email,
            skill_level: skillLevel,
            cohort_id: cohortId,
        }),
    };
    const response = await fetch(`${BACKEND_URL}/students`, requestOptions);
    if (response.status === 201) {
        const data = await response.json();
        return data;
    }else{
        throw new Error(`Error: ${response.status}`);
    }
};