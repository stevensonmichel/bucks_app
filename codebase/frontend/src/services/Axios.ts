import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchExpenses = async () => {
    return axios.get(`${API_BASE_URL}/expenses/`);
};

export const fetchBuckets = async () => {
    return axios.get(`${API_BASE_URL}/buckets/`);
};

export const createExpense = async (expenseData: any) => {
    return axios.post(`${API_BASE_URL}/expenses/`, expenseData);
};

export const createBucket = async (bucketData: any) => {
    return axios.post(`${API_BASE_URL}/buckets/`, bucketData);
};