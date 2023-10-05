import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Image } from "antd";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const { Meta } = Card;
function Allusers() {
  const [usersData, setusersData] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  const [genderFilter, setGender] = useState("all");
  const [loadmore, setLoadmore] = useState(10);
  const [loading,setLoading] = useState(false);
  const [active,setActive] = useState("all");
  useEffect(() => {
    setLoading(true);
    async function getUser() {
      try {
        const response = await axios.get(
          `https://randomuser.me/api/?results=${loadmore}`
        );
        
        if (response.status === 200) {
          setusersData(response.data.results);
          setLoading(false);
        }

      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, [loadmore]);

  const handleInputchange = (event) => {
    const { value } = event.target;
    setSearchterm(value);
    
  };

  const handleClick = (event) => {
    const { value } = event.target;
    setGender(value);
    setActive(value);
  };
  const handleLoad = () => {
    setLoadmore(loadmore + 10);
  };
  const filteredProducts = usersData.filter((users) => {
    const nameFilter = users.name.first.toLowerCase().includes(searchTerm.toLowerCase());
    const gender = genderFilter === "all" ? users : users.gender === genderFilter;
    return nameFilter&&gender;
  });

  return (
    <div>
      <div className="curosel mt-5 d-flex justify-content-center">
        <Carousel className="w-25">
          {usersData.map((user, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={user.picture.medium}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{user.name.first}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="btn-component mt-2 d-flex justify-content-center gap-2">
        <button className={`${active === "all"? "btn btn-info" : "btn btn-primary"}`} value={"all"} onClick={handleClick}>
          All
        </button>
        <button
          className={`${active === "male"? "btn btn-info" : "btn btn-primary"}`}
          value={"male"}
          onClick={handleClick}
        >
          Male
        </button>
        <button
          className={`${active  === "female" ? "btn btn-info" : "btn btn-primary"}`}
          value={"female"}
          onClick={handleClick}
        >
          Female
        </button>
      </div>
      <div className="search-componet d-flex justify-content-center">
        <nav className="navbar">
          <form className="form-inline d-flex gap-2">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleInputchange}
            />
          </form>
        </nav>
      </div>
      <div className="all-user-component">
        <h1 className="p-2">All Users</h1>
        <div className="users-list mt-5 d-flex justify-content-center flex-wrap gap-2">
          {filteredProducts.length === 0 ? (
            <h1>User Not Found</h1>
          ) : (
            filteredProducts.map((users, index) => {
              return (
                <Link key={index} to={`details/${users.id.value}`} style={{textDecoration: 'none'}}>
                  <Card
                    
                    hoverable
                    style={{
                      width: 240,
                    }}
                    cover={<img alt="example" src={users.picture.medium} />}
                  >
                      <Meta title={`${users.name.first} ${users.name.last}`} />
                  
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
      <div className="load-more d-flex justify-content-center mt-5">
       {filteredProducts.length > 0 ?  <button className="btn btn-primary" onClick={handleLoad}>
        {loading ? "Loading..." : "Load More"}
        </button>
        :""}
      </div>
    </div>
  );
}

export default Allusers;
