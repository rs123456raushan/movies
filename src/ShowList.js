import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function ShowList() {
    const navigate = useNavigate();
    const [shows, setShows] = useState([]);

    const handleClick = (_id) => {
        navigate(`/summary/${_id}`);
        // window.location.href = `/summary/${_id}`;
    }

    useEffect(() => {
        fetch("https://api.tvmaze.com/search/shows?q=all")
            .then((response) => response.json())
            .then((data) => setShows(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div style={{marginLeft: '35%'}}>
            <h2 style={{marginLeft: '20%', marginBottom: '2%', marginTop: '2%'}}>Show List</h2>
            {shows.map((show) => (
                <div>
                    <div class="card" style={{ width: '30rem', marginBottom: '3rem' }}>
                        <img src={show.show.image.original} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{show.show.name}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">Movie Runtime : {show.show.runtime}</h6>
                            <p class="card-text">{show.show.summary.substring(3, 100)}...</p>
                            <button onClick={() => handleClick(show.show.id)} type="button" class="btn btn-primary">Read More</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};