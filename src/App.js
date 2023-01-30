import './App.css';
import axios from 'axios';
import useSWR, { useSWRConfig } from "swr";

const fetcher = url => axios.get(url).then(res => res.data)

function App() {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="App">
      <div className='App-header'>
        <h1>Users List</h1> 
        {data.map((data, idx) => (
          <>
            <p key={idx}>{data.name} - {data.website}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
