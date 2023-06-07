import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SummaryScreen() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [summary, setSummary] = useState("");
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingFormData, setBookingFormData] = useState({
        movieName: "",
        movieDay: "",
        movieTime: "",
        country: ""
        // Add relevant details here
    });

    useEffect(() => {
        console.log(id);
        const showId = id;
        fetch(`https://api.tvmaze.com/shows/${showId}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setName(data.name);
                setSummary(data.summary);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleBookTicket = () => {
        setBookingFormData({
            movieName: name, // Set the movie name 
            movieDay: data.schedule.days[0] ? data.schedule.days[0] : "",
            movieTime: data.schedule.time ? data.schedule.time : "",
            country: data.network ? data.network.country.name : ""
        });
        if (showBookingForm) {
            setShowBookingForm(false);
        } else {
            setShowBookingForm(true);
        }
    };

    const handleClick = () => {
        if (email !== '') {
            alert("You have booked your ticket successfully !!!")
        } else {
            alert("Enter the email first !!!")
        }
    }

    return (
        <div style={{ marginLeft: '35%' }}>
            <h2 style={{ marginLeft: '13%', marginBottom: '2%', marginTop: '2%' }}>Summary Screen</h2>
            <div class="card" style={{ width: '30rem' }}>
                <div class="card-body">
                    <p class="card-text">{summary}</p>
                    <button onClick={handleBookTicket} type="button" class="btn btn-primary">Book Ticket</button>
                </div>
            </div>

            {showBookingForm && (
                <div style={{ width: '30rem' }}>
                    <h3 style={{ marginLeft: '22%', marginBottom: '2%', marginTop: '4%' }}>Movie : {bookingFormData.movieName}</h3>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Movie Name</label>
                        <input type="text" value={bookingFormData.movieName} onChange={(e) => setBookingFormData({ ...bookingFormData, movieName: e.target.value })} class="form-control" id="exampleFormControlInput1" placeholder="Enter the movie name" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" onChange={(e) => setEmail(e.target.value)} placeholder="Enter the email" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Day</label>
                        <input type="text" value={bookingFormData.movieDay} onChange={(e) => setBookingFormData({ ...bookingFormData, movieDay: e.target.value })} class="form-control" id="exampleFormControlInput1" placeholder="Please enter the day" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Time</label>
                        <input type="text" value={bookingFormData.movieTime} onChange={(e) => setBookingFormData({ ...bookingFormData, movieTime: e.target.value })} class="form-control" id="exampleFormControlInput1" placeholder="Please enter the time" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Country</label>
                        <input type="text" value={bookingFormData.country} onChange={(e) => setBookingFormData({ ...bookingFormData, country: e.target.value })} class="form-control" id="exampleFormControlInput1" placeholder="Please enter the country" />
                    </div>
                    <div style={{ marginBottom: '2%', marginTop: '4%' }} class="mb-3">
                        <button onClick={handleClick} type="button" class="btn btn-primary">Book Ticket</button>
                    </div>
                </div>
            )}
        </div>
    );
};