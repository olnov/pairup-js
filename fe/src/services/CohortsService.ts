const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getCohorts = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };
    const response = await fetch(`${BACKEND_URL}/cohorts`, requestOptions);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Error: ${response.status}`);
    }
};

export const createCohort = async (token: String, title: String, specialismId: String, startDate: String, endDate: String) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: title,
            specialism_id: specialismId,
            date_start: startDate,
            date_end: endDate,
        }),
    }
    const response = await fetch(`${BACKEND_URL}/cohorts`, requestOptions);
    if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        throw new Error(`Error: ${response.status}`);
    }
};