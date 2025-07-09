import { useState, useEffect } from 'react';

interface format {
  id: number
  name: string
}
export default function App() {

  const [data, setData] = useState<format[]>([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((antwort) => antwort.json())
      .then((daten) => setData([{ id: daten.id, name: daten.title }]))
  }, [])
  return (
    <div>
      <h1>
        {data.length > 0 ? data[0].id : ""}
        <br />
        {data.length > 0 ? data[0].name : ""}
      </h1>
    </div>
  );
}