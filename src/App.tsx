import { useState, useEffect } from 'react'

interface daten {
    userID: number;
    id: number;
    title: string;
    body: string;
}

export default function App() {

    const [userID, setUserID] = useState("")
    const [ID, setID] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const [data, setData] = useState<daten[]>([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(daten => daten.json())
            .then(neueDaten => {
                const datenarray = neueDaten.map((single: any) => ({ userID: single.userId, id: single.id, title: single.title, body: single.body }))
                setData(datenarray)
            })
    }, [])

    return (
        <div>
            <>
                <input type="text" placeholder="userID" value={userID} onChange={(e) => setUserID(e.target.value)} />
                <input type="text" placeholder="ID" value={ID} onChange={(e) => setID(e.target.value)} />
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />

                <button onClick={() => {
                    const newData = {userID: Number(userID), id: Number(ID), title: title, body: body}
                    fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newData),
                    })
                    .then(send => send.json())
                    .then(log => {
                        console.log(log)
                        setData(prevData => [log, ...prevData])
                    })
                }}>Send Data to API</button>
            </>
            <br /><br />
            <>
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
                                <tr key={item.id}>
                                    <td>{item.userID}</td>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </>
        </div>
    );
}