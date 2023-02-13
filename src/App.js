// import './App.css';
// import axios from 'axios';
import useSWR, { mutate } from "swr";
// import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useCrud } from './hooks/use-crud.tsx';

const url = 'http://localhost:3000/data'; //to start mock API server 'json-server --watch db.json'

function App() {
  const [formData, setFormData] = useState({ name: '', age: '' });
  const { create } = useCrud(url, url);
  const { fetching } = useCrud(url);
  // console.log(fetch)

  let listOfData = [];
  if(fetching && fetching.data) {
    let actualData = fetching.data.payload || {};
    for (const key in actualData) {
      if (actualData.hasOwnProperty(key)) {
        listOfData.push(key + ': ' + actualData[key].name);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit 1 console");
    // console.log(formData);
    const response = await create(formData, true);
    // setTimeout(() => {
    //   console.log("Submit 2 console");
    //   // console.log(response);
    // }, 10);
  }
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  
  const { data, mutate } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  
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
      {listOfData}
    </form>
  )
}


// // const fetcher = url => axios.get(url).then(res => res.data)
// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// // let user = {"id":11,"name": "James", "age": 23};
// let posts = {"userId":11,"id":11,"title": "James", "body": "Happy happy day"};

// function App() {
//   const { data, error } = useSWR('http://jsonplaceholder.typicode.com/users', fetcher, {
//     revalidateOnFocus: false,
//   })

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return (
//     <div className="App">
//       <div className='App-header'>
//         <h1>Users List</h1> 
//         {data.map((data, idx) => (
//           <>
//             <p key={idx}>{data.name}</p>
//           </>
//         ))}
//       </div>
//       <Button 
//         onClick={async () => {
//           await fetcher('http://localhost:3000/data', {
//           // await fetcher('http://jsonplaceholder.typicode.com/posts', {
//             method: 'POST',
//             body: JSON.stringify(posts),
//           });
//           mutate('http://localhost:3000/data');
//           // mutate('http://jsonplaceholder.typicode.com/posts');
//         }}
//       >
//         Add Posts
//       </Button>
//     </div>
//   );
// }

export default App;
