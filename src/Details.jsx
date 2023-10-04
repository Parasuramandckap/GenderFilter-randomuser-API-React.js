import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
export default function Details() {
  const { id } = useParams();

  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    async function getPerticularUser() {
      try {
        const response = await axios.get(`https://randomuser.me/api?id=${id}`);
        if (response.status === 200) {
          setUserdata(...userData, response.data.results);
          console.log(response.data.results);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getPerticularUser();
  }, []);
  return (
    <div className="d-flex justify-content-center mt-5">
      {userData.map((user, index) => {
        return (
          <div className="card w-50 " key={index}>
            <div className="card-body">
              <h5 className="card-title">{`${user.name.first} ${user.name.last}`}</h5>
              <img src={user.picture.medium} alt="" />
              <p className="card-text">
                {`Dob: ${user.dob.date.slice(0, 10)} Age${user.dob.age}`}
              </p>
              <p className="card-text">
                {`Address: ${user.location.street.number} ${user.location.street.name}${user.location.city}${user.location.state}${user.location.country}
                Pin:${user.location.postcode}`}
              </p>
              <p className="card-text">{`Email-id : ${user.email}`}</p>
              <Link to={"/"}>
                <a href="#" className="btn btn-primary">
                  Back to Home
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
