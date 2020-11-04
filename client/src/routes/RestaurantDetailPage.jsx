import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantContext } from '../context/RestaurantsContext';

const RestaurantDetailPage = () => {
    const {id} = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await RestaurantFinder.get(`/${id}`);

                setSelectedRestaurant(response.data.data);
            } catch (err) {
                console.log(err.message)
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center text-primary display-3">{selectedRestaurant.restaurant.name}</h1>
                    <p className="text-center text-warning"><StarRating rating={selectedRestaurant.reviews.length !== 0 ? selectedRestaurant.reviews.map(rate => Number(rate.rating)).reduce((a,b) => a+b) / selectedRestaurant.reviews.length : 0} /></p>
                    <div className="mt-3" >
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReview />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage
