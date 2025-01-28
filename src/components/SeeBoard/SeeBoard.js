import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import './SeeBoard.scss';
import { useRead } from '../../hooks/useRead';

const tabs = [
    { id: 'my-space', title: 'My Space' },
    { id: 'followers-spaces', title: 'Followers Spaces' },
    { id: 'following-spaces', title: 'Following Spaces' }
];

function SeeBoard() {
    const [mySpaceCards, setMySpaceCards] = useState([]);
    const [selectedTab, setSelectedTab] = useState('my-space');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(3); // Set the page size to 3
    const [allBoardsLoaded, setAllBoardsLoaded] = useState(false);
    const navigate = useNavigate();

    // Using useRead hook to fetch data
    const { response,fetchData } = useRead('get_products_by_email/');

    useEffect(() => {
        const payload={
            page: page,
            page_size: pageSize
        }
        fetchData(payload);
        
    }, [page,pageSize]);

    useEffect(() => {
        if (response) {
            if (response.length < pageSize) {
                setAllBoardsLoaded(true);
            }
            // Update the state only if new data is different to avoid duplicates
            setMySpaceCards(prevCards => {
                const newCards = response.filter(card => 
                    !prevCards.some(prevCard => prevCard.id === card.id)
                );
                return [...prevCards, ...newCards];
            });
        }
    }, [response, pageSize]);

    const toBoards = useCallback((board) => {
        const userBoard = {
            imageUrl: board.image_url.replace(/(^"|"$)/g, ''),
            background_removed_images: board.background_removed_images,
            description: board.description,
            title: board.title,
            hex_code: board.hex_code,
            width: board.width,
            height: board.height,
            generated_title: board.generated_title
        };
        navigate('/UserBoard', { state: { userBoard: userBoard } });
    }, [navigate]);

    useEffect(() => {
        AOS.init();
    });

    const loadMoreBoards = () => {
        if (!allBoardsLoaded) {
            setPage(prevPage => prevPage + 1); // Load the next page
        }
    };

    const renderCards = (cards) => (
        <div className="row">
            {cards.map((card) => (
                <div className="col-lg-3 col-md-4 " key={card.id}>
                    <div className="card product-title" data-aos="fade-down" data-aos-duration="1000">
                        <div className="head">
                            <img
                                src={`data:image/png;base64,${card.image_url.replace(/"/g, "")}`}
                                className="blogImg"
                                alt="blogImg"
                            />
                            <div className="date">
                                <p>
                                    <img src="/images/date.svg" alt="date" />
                                    {card.date}
                                </p>
                            </div>
                        </div>
                        <div className="content">
                            <h3>{card.generated_title}</h3>
                            <button onClick={() => toBoards(card)} className="readMore">
                                See Board <img src="/images/read.svg" alt="readImg" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <div className="seeBoard">
                <div className="container">
                    <div className="title" data-aos="fade-up" data-aos-duration="1000">
                        <h2>Samantha's Space</h2>
                        <p>Your world of inspirations.</p>
                        <span>34 followers  •  91 following</span>
                    </div>
                    <div className="tab-buttons" data-aos="fade-down" data-aos-duration="1000">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={selectedTab === tab.id ? 'active' : ''}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    <div className="board-container">
                        {selectedTab === 'my-space' && renderCards(mySpaceCards)}
                        {selectedTab === 'followers-spaces' && renderCards([])} {/* Placeholder for followers-spaces */}
                        {selectedTab === 'following-spaces' && renderCards([])} {/* Placeholder for following-spaces */}
                    </div>
                    <div className="text-center" data-aos="fade-down" data-aos-duration="1000">
                        {!allBoardsLoaded && (
                            <button onClick={loadMoreBoards} className="seeAll">
                                Load More <img src="/images/arrowRight.svg" alt="arrowRight" />
                            </button>   
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeeBoard;







