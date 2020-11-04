import React, { useContext, useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantsContext';


const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const {restaurants} = useContext(RestaurantContext)
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('')
    const history = useHistory();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }

        fetchData()
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name: name,
            location: location,
            price_range: priceRange
        });
        history.push("/")

    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input type="number" id="price_range" className="form-control" value={priceRange} onChange={e => setPriceRange(e.target.value)} />
                </div>

                <div>
                    <button type='submit' className='btn btn-warning' onClick={handleSubmit} >EDIT</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateRestaurant
