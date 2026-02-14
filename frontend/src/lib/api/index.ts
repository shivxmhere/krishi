import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = {
    scans: {
        detect: (formData: FormData) => client.post('/api/v1/predict/disease', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
        history: () => client.get('/api/v1/user/scans'),
    },
    admin: {
        getMetrics: (params: any) => client.get('/api/v1/admin/metrics', { params }),
        getUsers: () => client.get('/api/v1/admin/users'),
        deployModel: (id: string) => client.post(`/api/v1/admin/models/${id}/deploy`),
        startTraining: (id: string) => client.post(`/api/v1/admin/models/${id}/train`),
        rollbackModel: (id: string, version: string) => client.post(`/api/v1/admin/models/${id}/rollback`, { version }),
    }
};
