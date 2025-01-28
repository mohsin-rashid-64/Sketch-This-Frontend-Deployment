import { useState, useEffect, useContext } from "react";
import "./SelectedProducts.scss";
import AOS from "aos";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Loader from "../../LoaderOfImage/LoaderIns";
import { AuthContext } from "../../../Context/AuthContext";
import { useCreate } from "../../../hooks/useCreate";
import { useRead } from "../../../hooks/useRead";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [generating, setGenerating] = useState(false);
  const { _auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { function_name, style } = location.state || {};
  const { create } = useCreate("generate-description/");

  // const categories = {
  //   Sleep: ["mattress", "pillow", "comfort", "duvet", "sheet", "rug", "paint"],
  //   Entertainment: ["sofa", "sectional", "chair", "table", "lamp", "rug"],
  //   Dining: ["dining chair", "table", "napkin", "bar", "rug", "paint"],
  //   Bath: ["towel", "showerhead", "bench", "tile", "rug", "paint"],
  // };
  const categories = {
    Sleep: ["Sleep","mattress", "pillow", "comfort", "duvet", "sheet", "rug", "paint"],
    Entertainment: ["Entertainment","sofa", "sectional", "chair", "table", "lamp", "rug"],
    Dining: ["Dining","dining chair", "table", "napkin", "bar", "rug", "paint"],
    Bath: ["Bath","towel", "showerhead", "bench", "tile", "rug", "paint"],
  };

  const tabs = [
    { title: "Back", id: "back" },
    { id: "all", title: "All" },
    ...(function_name && categories[function_name]
      ? categories[function_name].map((item) => ({ id: item, title: item }))
      : []),
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(
    tabs.length > 2 ? 2 : 1
  );

  const {
    response: data,
    loading,
    error,
    fetchData,
  } = useRead(
    `/products?page=${page}${
      tabs[selectedTabIndex]?.id !== "all"
        ? `&search=${tabs[selectedTabIndex]?.id}`
        : ""
    }`
  );

  useEffect(() => {
    AOS.init(); // Initialize AOS animations.
  }, []);

  useEffect(() => {
    fetchData(); // Trigger API call when page or tab changes.
  }, [page, selectedTabIndex]);

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
  }, [data]);

  const handleTabClick = (tabIndex) => {
    if (tabs[tabIndex].id === "back") {
      navigate("/Steps");
      return;
    }
    setSelectedTabIndex(tabIndex);
    setPage(1);
    setProducts([]); // Clear products when changing tab.
  };

  const loadMoreProducts = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for pagination.
  };

  const addToCart = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        return prevSelected.filter((item) => item !== product);
      } else if (prevSelected.length < 10) {
        return [...prevSelected, product];
      } else {
        alert("You can't select more than 10 products.");
        return prevSelected;
      }
    });
  };

  const goToCart = async () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product.");
      return;
    }
    if (!_auth) {
      alert("Please Login.");
      navigate("/");
      return;
    }

    setGenerating(true);
    try {
      const selections = selectedProducts.map((p) => p.title);
      const payload={
        email: "email@example.com",
        selections,
        selectedProducts,
      }
      const response = await create(payload);
      

      if (response.background_removed_images) {
        localStorage.setItem("isImageSave", true);
        navigate("/BoardDetail", {
          state: { selectedProducts, ...response, function_name, style },
        });
      } else {
        throw new Error("Background removed images are missing in the response.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const isProductSelected = (product) => selectedProducts.includes(product);

  if (generating) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="products">
        <div className="container">
          <div className="title" data-aos="fade-up" data-aos-duration="1000">
            <h2>Choose Your...</h2>
            <p>Search by product and create your combinations.</p>
          </div>
          <div
            className="tab-buttons"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <button
              onClick={() => handleTabClick(selectedTabIndex - 1)}
              disabled={selectedTabIndex === 0}
            >
              Previous
            </button>
            <button className="active">{tabs[selectedTabIndex]?.title}</button>
            <button
              onClick={() => handleTabClick(selectedTabIndex + 1)}
              disabled={selectedTabIndex === tabs.length - 1}
            >
              Next
            </button>
          </div>
          <div className="productsBlock height-card">
            {loading ? (
              <Loader />
            ) : products.length > 0 ? (
              <div className="row height-card">
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
                        <h3 className="product-title">{product.title}</h3>
                        <button
                          className={`readMore ${
                            isProductSelected(product) ? "selected" : ""
                          }`}
                          onClick={() => addToCart(product)}
                        >
                          {isProductSelected(product) ? "Selected" : "Select"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
          </div>
          {products.length > 0 && (
            <div className="load-more-select">
              <button onClick={loadMoreProducts} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          <div className="proceed-to-next">
            <button onClick={goToCart} className="generate-btn">
              Proceed to Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
