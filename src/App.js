// import useSWR, { mutate } from "swr";
import React, { useState } from 'react';
import { useCrud } from './hooks/use-crud.tsx';

const url = 'http://localhost:3000/data'; //to start mock API server 'json-server --watch db.json'

function App() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const { create } = useCrud(url, url);
  const { fetching } = useCrud(url);

  //GET and display
  var listOfData = [];
  if(fetching && fetching.data) {
    var actualData = fetching.data.payload || {};
    for (const key in actualData) {
      if (actualData.hasOwnProperty(key)) {
        listOfData.push(actualData[key]);
      }
    }
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(`Going through POST ${JSON.stringify(formData)}`)

  //   const body = JSON.stringify(formData);
  //   const headers = { 'Content-Type': 'application/json'};
  //   const response = await fetch(url, { method: 'POST', body, headers });
  //   mutate(await response.json(), false);
  // };

  // Create
  const handleSubmit = async (event) => {
    event.preventDefault();
    await create(formData, true);
  }
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  
  // const { data, mutate } = useSWR(url, () =>
  //   fetch(url).then((res) => res.json())
  // );
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Age:
        <input type="age" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
      <br />
      <ul>
        {listOfData.map((item, index) => (
          <li key={index}>
            {index}. {item.name}, aged {item.age}.
          </li>
        ))}
      </ul>
    </form>
  )
}

export default App;
