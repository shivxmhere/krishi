import client from './client';

export const auth = {
    login: (data: any) => client.post('/auth/login', data),
    register: (data: any) => client.post('/auth/signup', data),
    getProfile: () => client.get('/auth/me'),
};

export const detection = {
    upload: (formData: FormData) => client.post('/detect/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getHistory: (params: any) => client.get('/detect/history', { params }),
    getResult: (id: string) => client.get(`/detect/${id}`),
};

export const weather = {
    get: (location: string) => client.get('/weather/', { params: { location } }),
};
