import {useState, useCallback } from 'react';
import useSWR from 'swr';

// import {SUBMIT_BIOGRAPHICAL_INFORMATION_URL} from '../constants/formApiUrls'
// import {request} from '../utils/httpClient'

export const useForm = (url) => {
    const [formData, setFormData] = useState({});
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        // console.log(`Going through POST ${JSON.stringify(formData)}`)

        const body = JSON.stringify(formData);
        const headers = { 'Content-Type': 'application/json'};
        const response = await fetch(url, { method: 'POST', body, headers });
        mutate(await response.json(), false)
    }, [formData, url, mutate]);

    const handleChange = useCallback((event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value
        });
    }, [formData, setFormData]);

    const { data, mutate } = useSWR(url, () =>
        fetch(url).then((res) => res.json())
    );

    return { data, formData, handleChange, handleSubmit };
};