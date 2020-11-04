import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantsContext'
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantContext);
    let history = useHistory()

    useEffect(() =>{
        const fetchData = async () =>{
            try {
                const response = await RestaurantFinder.get('/');
                setRestaurants(response.data.data.restaurants)
            } catch (err) {
                console.log(err.message)
            }
        }

        fetchData()
    }, [])

    const handleEdit = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`);
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const result = await RestaurantFinder.delete(`/${id}`);

            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleRestaurantSelect = (id) => {
        history.push(`restaurants/${id}`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr key="0" className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map(elem =>{
                        return (
                            <tr onClick={() => handleRestaurantSelect(elem.id)} key={elem.id}>
                                <td>{elem.name}</td>
                                <td>{elem.location}</td>
                                <td>{'$'.repeat(elem.price_range)}</td>
                                <td><StarRating rating={elem.average_rating} /> [ {elem.count} ]</td>
                                <td><button onClick={(e) => handleEdit(e, elem.id)} className="btn btn-warning">EDIT</button></td>
                                <td><button onClick={(e) => handleDelete(e, elem.id)} className="btn btn-danger">DELETE</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;
