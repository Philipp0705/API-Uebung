import { useState, useEffect } from 'react'

interface daten {
  userID: number
  ID: number
  title: string
  body: string
}

export default function App() {
  const [data, setData] = useState<daten[]>([])

  console.log(data)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(received => received.json())
      .then(data => {
        const oneData = data.map((item: any) => ({ userID: item.userId, ID: item.id, title: item.title, body: item.body }))
        setData(oneData)
      })
  }, [])
  return (
    <div>
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
          {data.map((item) =>
            <tr key={item.ID}>
              <td>{item.userID}</td>
              <td>{item.ID}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}