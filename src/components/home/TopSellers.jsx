import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

export default function TopSellers() {
  const [userData, setUserData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSkeleton(false);
    setUserData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" data-aos-anchor-placement="top-bottom">
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol
              className="author_list"
              data-aos="fade-in"
              data-aos-anchor-placement="top-bottom"
            >
              {skeleton
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="nft_skeleton">
                        <div className="author_list_pp">
                          <Link to="/author">
                            <Skeleton
                              borderRadius={50}
                              height={50}
                              width={50}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Skeleton height={20} width={100} />
                          <span>
                            <Skeleton height={20} width={40} />
                          </span>
                        </div>
                      </div>
                    </li>
                  ))
                : userData.map((userProfile, index) => (
                    <li
                      key={index}
                      data-aos="fade-in"
                      data-aos-anchor-placement="top-bottom"
                    >
                      <div className="author_list_pp">
                        <Link to={`/author/${userProfile.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={userProfile.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${userProfile.authorId}`}>
                          {userProfile.authorName}
                        </Link>
                        <span>{userProfile.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
