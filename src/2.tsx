import { useState, useEffect } from 'react';

interface daten {
  userID: number;
  ID: number;
  title: string;
  body: string;
}

export default function App() {
  const [data, setData] = useState<daten[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(daten => daten.json())
      .then(neu => {
        const single = neu.map((item: any) => ({ userID: neu.userId, ID: neu.id, title: neu.title, body: neu.body }))
        setData(single)
      })
  }, [])
  return (
    <div>
      {data.length === 0 ? <h1>Keine Daten vorhanden!</h1> :
        <table>
          <thead>
            <tr>
              <td>UserID</td>
              <td>ID</td>
              <td>Title</td>
              <td>Body</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ID}>
                <td>{item.userID}</td>
                <td>{item.ID}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div >
  );
}