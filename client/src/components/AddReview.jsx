import React, { useState } from 'react'
import {useHistory, useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
    const {id} = useParams();
    const history = useHistory();
    
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name: name,
                rating: rating,
                review: review
            })
        } catch (err) {
            console.log(err.message)
        }
        history.push('/')
        history.push(`/restaurants/${id}`)
    }


    return (
        <div className="mb-2">
            <form action="" >
                <div className="form-row">
                    <div className="from-group col-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={e=> setName(e.target.value)} />
                    </div>
                    <div className="from-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select name="rating" id="rating" className="custom-select" value={rating} onChange={e => setRating(e.target.value)}>
                            <option value="0" disabled>Set your Rating</option>
                            <option value="1">*</option>
                            <option value="2">**</option>
                            <option value="3">***</option>
                            <option value="4">****</option>
                            <option value="5">*****</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea id="review" cols="30" rows="10" className="form-control" placeholder="Write your experience" value={review} onChange={e => setReview(e.target.value)}></textarea>
                </div>
                <button type='submit' onClick={handleSubmitReview} className="btn btn-primary">Submit!</button>
            </form>
        </div>
    )
}

export default AddReview
