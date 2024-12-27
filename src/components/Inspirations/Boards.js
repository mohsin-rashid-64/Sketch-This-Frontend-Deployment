


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import axios from 'axios';
import Loader from '../LoaderOfImage/LoaderIns';


function Boards() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);  // Start from page 1
    const [pageSize] = useState(16);  // Set the page size to 16
    const [allBoardsLoaded, setAllBoardsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();


        const fetchBoards = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_products_all/`, {
                    params: {
                        page: page,
                        page_size: pageSize
                    }
                });

                if (response.data.length < pageSize) {
                    setAllBoardsLoaded(true);  // If fewer than pageSize products are returned, all products have been loaded
                }

                setBoards(prevBoards => [...prevBoards, ...response.data]);
                setLoading(false);
            } catch (error) {
                console.error("There was an error fetching the boards!", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBoards();
    }, [page]);  // Re-run the effect whenever the page changes

    const toBoards = (board) => {
        const userBoard = {
            imageUrl: board.image_url.replace(/(^"|"$)/g, ''),
            background_removed_images: board.background_removed_images,
            description: board.description,
            title: board.title,
            hex_code: board.hex_code,
            width: board.width,
            height: board.height,
            generated_title:board.generated_title
        };
        navigate('/UserBoard', { state: { userBoard: userBoard } });
    };

    const loadMoreBoards = () => {
        if (!allBoardsLoaded) {
            setPage(prevPage => prevPage + 1);  // Load the next page
        }
    };

    if (loading && page === 1) return  <Loader/>;
    if (error) return <p>Error: {error}</p>;

    return (
        <React.Fragment>
            <div className="boards">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <h2>Boards</h2>
                        <p>Want some inspiration. Check out our community</p>
                    </div>
                    <div className="row">
                        {boards.slice(0, page * pageSize).map((board, index) => (
                            <div className="col-lg-4 col-md-4" key={index}>
                                <div className="card" data-aos="fade-down" data-aos-duration="1000" onClick={() => toBoards(board)} >
                                    <div className="head">
                                        <img
                                            src={`data:image/jpeg;base64,${board.image_url.replace(/(^"|"$)/g, '')}`}
                                            className="blogImg"
                                            alt="blogImg"
                                            style={{ width: '100%', height: 'auto' }}
                                        />
                                        <div className="date">
                                            <p>
                                                <img src="/images/date.svg" alt="date" />
                                                {board.timestamp ? new Date(board.timestamp).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>{board.title}</h3>
                                        {/* <p>{board.description}</p> */}
                                        <button onClick={() => toBoards(board)} className="readMore">
                                            See Board <img src="/images/read.svg" alt="readImg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center" data-aos="fade-down" data-aos-duration="1000">
                        {!allBoardsLoaded && (
                            <button onClick={loadMoreBoards} className="seeAll">
                                Load More <img src="/images/arrowRight.svg" alt="arrowRight" />
                            </button>
                        )}
                        {allBoardsLoaded && (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Boards;
