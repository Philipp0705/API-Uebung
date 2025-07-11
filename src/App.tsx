import { useState, useEffect } from 'react'

interface daten {
    userId: number,
    id: number,
    title: string,
    body: string,
}

export default function App() {
    const [data, setData] = useState<daten[]>([])
    const [filter, setFilter] = useState("")
    const [tbFilter, setTbFilter] = useState("")
    const [userId, setUserId] = useState("")
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFilter(tbFilter)
        }, 500)

        return () => clearTimeout(timeout)
    }, [tbFilter])

    useEffect(() => {
        fetch(filter === "" ? 'https://jsonplaceholder.typicode.com/posts' : `https://jsonplaceholder.typicode.com/posts?userId=${filter}`)
            .then(got => got.json())
            .then(changed => setData(changed))
    }, [filter])
    return (
        <div>
            <>
                <input type="number" placeholder="UserID" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <input type="number" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                <button onClick={() => {
                    const newData = { userId: userId, id: id, title: title, body: body }
                    fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newData)
                    })
                        .then(getdata => getdata.json())
                        .then(newgetdata => setData([newgetdata, ...data]))
                }}>Send Data to API</button>
            </>
            <br />
            <>
                <input type="number" placeholder="Filter nach UserID" value={tbFilter} onChange={(e) => setTbFilter(e.target.value)} />
            </>
            <>
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
                            <tr key={item.id}>
                                <td>{item.userId}</td>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </div>
    );
}