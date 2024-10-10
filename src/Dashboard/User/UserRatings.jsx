import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaEdit } from 'react-icons/fa';
import useDesignation from '../../hooks/useDesignation';
import toast from 'react-hot-toast';

const UserRatings = () => {
    const [reviews, setReviews] = useState([]);
    const [reload, setReload] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const { userInfo } = useDesignation();
    // const userId = "66f4cf5a3ba27ae4690cc441"
    const userId = userInfo?._id

    //  editing review
    const [editReviewText, setEditReviewText] = useState('');
    const [editRating, setEditRating] = useState(0);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/feedbackRoute/feedbacks/${userId}?user=true`);
                setReviews(response.data); 
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [userId, reload]);
console.log(selectedReview);
    const handleEditClick = (review) => {
        setSelectedReview(review);
        setEditReviewText(review.review);  
        setEditRating(review.rating);  
        setIsModalOpen(true);
    };

    const handleReviewTextChange = (e) => {
        setEditReviewText(e.target.value);
    };

    const handleRatingChange = (rating) => {
        setEditRating(rating);
    };


    const handleSaveReview = async () => {
        try {
            const updatedReview = {
                ...selectedReview,
                review: editReviewText,
                rating: editRating,
            };

            
            const {data} = await axios.put(`http://localhost:3000/api/feedbackRoute/feedback/${selectedReview._id}`, updatedReview);

            if (data.modifiedCount === 1) {
                setReload(true)
                toast.success("Feedback updated successfully")
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };
    console.log(reviews);
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Reviews</h1>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="bg-white p-4 rounded-lg flex justify-between items-center"
                        style={{ boxShadow: '0 20px 50px #FEF2F2' }}
                    >
                        <div className='flex gap-20 flex-row-reverse'>
                            <div>
                                <h3 className="text-xl font-semibold">{review.carName}</h3>
                                <p className="text-gray-600">{review.review}</p>
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className={`mr-1 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <img className='h-20 w-32 rounded-lg' src={review.reviewImage} alt="" />
                            </div>
                        </div>
                        <button
                            onClick={() => handleEditClick(review)}
                            className="flex items-center text-primary hover:underline"
                        >
                            <FaEdit className="mr-1" /> Edit
                        </button>
                    </div>
                ))}
            </div>

            {/* Edit Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96" style={{ boxShadow: '0 6px 12px rgba(255, 0, 0, 0.3)' }}>
                        <h2 className="text-2xl font-bold mb-4">Edit Review</h2>
                        <textarea
                            value={editReviewText}  
                            onChange={handleReviewTextChange}
                            className="w-full p-2 border rounded mb-4"
                            rows="4"
                            placeholder="Edit your review"
                        ></textarea>

                        <div className="flex items-center mb-4">
                            <span className="mr-2">Rating: </span>
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    onClick={() => handleRatingChange(index + 1)}
                                    className={`mr-1 cursor-pointer ${index < editRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveReview}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserRatings;
