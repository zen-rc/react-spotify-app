import React, { useEffect, useState } from "react";

const ParallelProcessingExample = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const items = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responses = await Promise.all(
                    items.map((item) =>
                        fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
                            .then((response) => response.json())
                    )
                );
                setData(responses);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

