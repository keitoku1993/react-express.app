import React, {useState, useEffect} from 'react';

type UserUI = {
    id: string,
    username: string,
    name: string,
    email: string
}

const App: React.FC = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [userList, setUserList] = useState<UserUI[]>([]);

    const fetchMessage = async () => {
        const message = await fetch('/api').then(res => res.text())
        setWelcomeMessage(message)
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    const fetchUsers = async () => {
        const users = await fetch('/users/all').then(res => res.json())
        setUserList(users)
    }

    return (
        <div className="app">
            <header className="app-header">
                <p>hello</p>
                <p>{welcomeMessage}</p>
                <button onClick={fetchUsers}>Fetch users</button>
                {userList.length !== 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user: UserUI) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </header>
        </div>
    )
}

export default App;