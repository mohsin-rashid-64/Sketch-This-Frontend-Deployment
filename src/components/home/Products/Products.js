import { useState, useEffect, useContext } from "react";
import "./Products.scss";
import AOS from "aos";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRead } from "../../../hooks/useRead";
import { useCreate } from "../../../hooks/useCreate.js";
import Loader from "../../LoaderOfImage/LoaderIns";

const Products = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { _auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { create } = useCreate("generate-description/");
  
  const { response: data, loading, error, fetchData } = useRead(
    `products?page=${page}${selectedTab !== "all" ? `&search=${selectedTab}` : ""}`
  );

  const tabs = [
    { id: "all", title: "All" },
    { id: "table", title: "Table" },
    { id: "sofa", title: "Sofa" },
    { id: "chair", title: "Chair" },
    { id: "loveseat", title: "Loveseat" },
    { id: "sectional", title: "Sectional" },
    { id: "bath", title: "Bath" },
    { id: "storage", title: "Storage" },
    { id: "bed", title: "Bed" },
    { id: "dining", title: "Dining" },
    { id: "entertainment", title: "Entertainment" },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    fetchData(); // Fetch data when page or selected tab changes
  }, [page, selectedTab]);

  useEffect(() => {
    if (data) {
      const productsWithDecodedImages = data.map((product) => ({
        ...product,
        image: `data:image/jpeg;base64,${product.image}`,
      }));
      setProducts((prevProducts) =>
        page === 1
          ? productsWithDecodedImages
          : [...prevProducts, ...productsWithDecodedImages]
      );
    }
  }, [data, page]);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    setPage(1); // Reset to first page on tab change
    setProducts([]); // Clear existing products
  };

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const addToCart = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((item) => item !== product);
      } else {
        if (prevSelected.length >= 10) {
          alert("You can't select more than 10 products.");
          return prevSelected;
        } else {
          return [...prevSelected, product];
        }
      }
    });
  };

  const isProductSelected = (product) => selectedProducts.includes(product);

  const goToCart = async () => {
    if (selectedProducts.length > 0) {
      if (_auth) {
        setGenerating(true);
        try {
          const selections = selectedProducts.map((p) => p.title);

          const payload = {
            email: "email@example.com",
            selections: selections,
            selectedProducts: selectedProducts,
          };
          const response = await create(payload);

          if (response.background_removed_images) {
            localStorage.setItem("isImageSave", true);
            navigate("/BoardDetail", {
              state: { selectedProducts, ...response },
            });
          } else {
            throw new Error("Image URL is missing from the response.");
          }
        } catch (error) {
          console.error("Error generating image:", error);
          alert(`Error generating image: ${error.message}`);
        } finally {
          setGenerating(false);
        }
      } else {
        alert("Please login to proceed.");
        navigate("/");
      }
    } else {
      alert("Please select at least one product.");
    }
  };

  if (generating || loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="products">
      <div className="container">
        <div className="title" data-aos="fade-up" data-aos-duration="1000">
          <h2>Our Selections</h2>
          <p>Just browsing. Search by product and make your own combinations.</p>
        </div>
        <div
          className="tab-buttons"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={selectedTab === tab.id ? "active" : ""}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="productsBlock">
          <div className="row">
            {products.map((product) => (
              <div
                className="col-lg-4"
                data-aos="fade-up"
                data-aos-duration="1000"
                key={product.id}
              >
                <div className="card">
                  <div className="head">
                    <img
                      src={product.image}
                      className="blogImg"
                      alt="Product"
                    />
                    <div className="date">
                      <p>
                        $ <span>{product.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="content">
                    <h4>{product.title}</h4>
                    <button
                      className={`readMore ${isProductSelected(product) ? "selected" : ""}`}
                      onClick={() => addToCart(product)}
                    >
                      {isProductSelected(product) ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="load-more">
  <button onClick={loadMoreProducts} disabled={loading} className="load-more-button">
    {loading ? "Loading..." : "Load More"}
  </button>
  <div className="cart-button-wrapper">
    <button onClick={goToCart} className="cart-button-select">
      Create Board
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default Products;
