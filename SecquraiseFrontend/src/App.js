import React, { useState, useEffect } from "react";
import Axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { RiEqualizerLine } from "react-icons/ri";
import { useFormik } from "formik";
import "./App.css";

const App = () => {
  const [userValues, setValues] = useState({
    userData: [
      [
        "EVT0001",
        {
          date: "5-Jan-23",
          gender: "Female",
          location: "Bangalore",
          time: "9:05:23",
          username: "Female01",
          image_url:
            "https://res.cloudinary.com/duapyyftc/image/upload/v1682407332/Female01_fqsxbm.jpg",
        },
      ],
    ],
    activeUser: "EVT0001",
    filtrationActive: false,
  });

  const formik = useFormik({
    initialValues: {
      filterLocation: "",
      filterGender: "",
      filterDate: "",
    },
    onSubmit: (values) => {
      const { filterLocation, filterGender, filterDate } = values;
      const splitDate = filterDate.split("-");
      const dateObject = new Date(splitDate[0], splitDate[1], splitDate[2]);
      const finalDate =
        dateObject.getDate() +
        "-" +
        dateObject.getMonth() +
        "-" +
        dateObject.getFullYear();
      const inputFiltrationUsers = userValues.userData.filter(
        (eachOf) =>
          eachOf[1].gender === `${filterGender}` &&
          eachOf[1].location === `${filterLocation}` &&
          eachOf[1].date === `${finalDate}`
      );
      setValues({
        ...userValues,
        activeUser: inputFiltrationUsers[0][0],
        userData: inputFiltrationUsers,
      });
    },
  });

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/getData");
    const usersData = response.data;
    let totalUsers = Object.entries(usersData);
    setValues({ ...userValues, userData: totalUsers });
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredUsersData = userValues.userData.filter(
    (eachUser) => eachUser[0] === userValues.activeUser
  );

  const [filteredOne] = filteredUsersData;
  const [filteredUserId, filteredUserDetails] = filteredOne;

  const { date, location, time, username, image_url, gender } =
    filteredUserDetails;
  const genderMaleCount = userValues.userData.filter(
    (eachOne) => eachOne[1].gender === "Male"
  );
  const genderFemaleCount = userValues.userData.filter(
    (eachOne) => eachOne[1].gender === "Female"
  );
  return (
    <div className="main-container">
      <div className="gender-count-container">
        <h1 className="company-head">
          SECQUR<span className="company-head-span">AI</span>SE
        </h1>
        <div className="gender-container">
          <p className="male-count">{genderMaleCount.length}</p>
          <p className="female-count">{genderFemaleCount.length}</p>
        </div>
      </div>
      <div className="bottom-container">
        <div className="leftmost-bar">
          <GiHamburgerMenu className="left-icon" />
          <BiLogIn className="left-icon" />
        </div>
        <div className="user-details-container">
          <div>
            <h2>{filteredUserId}</h2>
            <h2>Person Detected</h2>
            <p>{`Name : ${username}`}</p>
            <p>{`Location : ${location}`}</p>
            <p>{`Date : ${date}`}</p>
            <p>{`Time : ${time}`}</p>
            <p>
              Description : <br /> {username} detected at <br /> {location} on{" "}
              {date}
            </p>
          </div>
          <div>
            <h3>{gender}</h3>
            <img
              className="gender-image"
              src={`${image_url}`}
              alt={`${gender}`}
            />
          </div>
        </div>
        <div className="user-buttons-container-top">
          <div className="filtration-cont">
            <h2>Events</h2>
            <button
              onClick={() =>
                setValues({
                  ...userValues,
                  filtrationActive: !userValues.filtrationActive,
                })
              }
              className="filtration-button"
            >
              <RiEqualizerLine className="filtration-icon" />
            </button>
          </div>
          {userValues.filtrationActive ? (
            <form onSubmit={formik.handleSubmit}>
              <select
                name="filterLocation"
                onChange={formik.handleChange}
                value={formik.values.filterLocation}
                className="filtration-input"
              >
                <option>Select Location</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Bangalore</option>
              </select>
              <select
                name="filterGender"
                onChange={formik.handleChange}
                value={formik.values.filterGender}
                className="filtration-input"
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                name="filterDate"
                onChange={formik.handleChange}
                value={formik.values.filterDate}
                className="filtration-input"
                type="date"
              />
              <button type="submit">Go</button>
            </form>
          ) : (
            ""
          )}

          <div className="user-buttons-container">
            {userValues.userData.map((each) => {
              const [userId, detailsOfUsers] = each;
              return (
                <button
                  key={userId}
                  className={`${
                    userId === userValues.activeUser ? "active-button" : ""
                  } inactive-button`}
                  onClick={() =>
                    setValues({ ...userValues, activeUser: userId })
                  }
                >
                  <div className="button-span">
                    <p>{`${userId} : ${detailsOfUsers.location}`}</p>
                    <p>{`${detailsOfUsers.date} ${detailsOfUsers.time}`}</p>
                  </div>
                  <p className="button-left-text">Person Detected.</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
