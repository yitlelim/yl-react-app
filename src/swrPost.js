import {useState, useCallback } from 'react';
import useSWR from 'swr';

// import {SUBMIT_BIOGRAPHICAL_INFORMATION_URL} from '../constants/formApiUrls'
// import {request} from '../utils/httpClient'

export const useForm = (url) => {
    const [formData, setFormData] = useState({});
    const { data, mutate } = useSWR(url, request);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        const body = JSON.stringify(formData);
        const headers = { 'Content-Type': 'application/json'};
        mutate(await fetch(url, { method: 'POST', body, headers }).then(res => res.json()), false)
  }, [formData, url, mutate]);

    const handleChange = useCallback((event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        });
    }, [formData, setFormData]);

    

    return { data, formData, handleChange, handleSubmit };
};