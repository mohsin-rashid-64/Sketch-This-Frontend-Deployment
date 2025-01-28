import { useEffect, useState } from "react";
import "./Blog.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import AOS from "aos";
import { useRead } from "../../../hooks/useRead";


function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1); // Start from page 1
  const [pageSize] = useState(16); // Set the page size to 16
  const { response: response, fetchData } = useRead(`get_products_all/`);
  

  useEffect(() => {
    AOS.init();
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      response=await fetchData({
        params: {
          page: page,
          page_size: pageSize,
        },
      });

      setBlogs(response);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="blog">
      <div className="container">
        <div className="title" data-aos="fade-up" data-aos-duration="1000">
          <h2>Inspirations</h2>
          <p>Want some inspiration? Check out our weekly blog</p>
        </div>
        <Swiper
          navigation={true}
          spaceBetween={30}
          loop={true}
          slidesPerView={1}
          modules={[Navigation]}
          breakpoints={{
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
          className="mySwipers"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div
                className="card"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <div className="head">
                  <img
                    src={`data:image/jpeg;base64,${blog.image_url.replace(
                      /(^"|"$)/g,
                      ""
                    )}`}
                    className="blogImg"
                    alt="blogImg"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="content">
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="text-center"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <Link to="/inspirations" className="seeAll">
            See All <img src="/images/arrowRight.svg" alt="arrowRight" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;
