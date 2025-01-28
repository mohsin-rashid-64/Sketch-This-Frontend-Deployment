import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { useRead } from "../../hooks/useRead";
import Loader from "../LoaderOfImage/LoaderIns";

function Boards() {
  const [boards, setBoards] = useState([]); // Hold all the fetched boards
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Start from page 1
  const [pageSize] = useState(3); // Set the page size to 16
  const [allBoardsLoaded, setAllBoardsLoaded] = useState(false);
  const navigate = useNavigate();
  const { fetchData } = useRead("get_products_all/");

  useEffect(() => {
    AOS.init();
    
    const fetchBoards = async () => {
      try {
        // Fetch boards using useRead's fetchData function with params
        const response = await fetchData({
          params: {
            page: page,
            page_size: pageSize,
          },
        });

        // Check if the response contains fewer items than the page size
        if (response && response.length < pageSize) {
          setAllBoardsLoaded(true); // All boards loaded, no more to load
        }

        // Append the newly fetched boards to the existing ones
        setBoards((prevBoards) => [...prevBoards, ...response]);

        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the boards!", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBoards();
  }, [page, pageSize]); // Dependency array updated to fetch only when page or pageSize changes

  const toBoards = (board) => {
    const userBoard = {
      imageUrl: board.image_url.replace(/(^"|"$)/g, ""),
      background_removed_images: board.background_removed_images,
      description: board.description,
      title: board.title,
      hex_code: board.hex_code,
      width: board.width,
      height: board.height,
      generated_title: board.generated_title,
    };
    navigate("/UserBoard", { state: { userBoard: userBoard } });
  };

  const loadMoreBoards = () => {
    if (!allBoardsLoaded) {
      setPage((prevPage) => prevPage + 1); // Load the next page
    }
  };

  if (loading && page === 1) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="boards">
        <div className="container">
          <div className="title" data-aos="fade-up" data-aos-duration="1000">
            <h2>Boards</h2>
            <p>Want some inspiration. Check out our community</p>
          </div>
          <div className="row">
            {boards.slice(0, page * pageSize).map((board, index) => (
              <div className="col-lg-4 col-md-4" key={index}>
                <div
                  className="card"
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  onClick={() => toBoards(board)}
                >
                  <div className="head">
                    <img
                      src={`data:image/jpeg;base64,${board.image_url.replace(
                        /(^"|"$)/g,
                        ""
                      )}`}
                      className="blogImg"
                      alt="blogImg"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="date">
                      <p>
                        <img src="/images/date.svg" alt="date" />
                        {board.timestamp
                          ? new Date(board.timestamp).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="content">
                    <h3>{board.title}</h3>
                    <button
                      onClick={() => toBoards(board)}
                      className="readMore"
                    >
                      See Board <img src="/images/read.svg" alt="readImg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="text-center"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
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

export default Boards;
