import React, { useEffect, useState } from "react";
import { FaComment, FaArrowUp, FaArrowDown, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../load.css";
import "../App.css";
import styles from "../PostList.module.css";
import FilterButtons from "./FilterButtons";

export const formatTime = (timeStamp) => {
  const currentDate = new Date();
  const postDate = new Date(timeStamp * 1000); // convert to milliseconds

  const timeDiff = currentDate.getTime() - postDate.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (hoursDiff < 1) {
    return "Less than an hour ago";
  } else if (hoursDiff === 1) {
    return "1 hour ago";
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  } else {
    const dayDiff = Math.floor(hoursDiff / 24);
    return dayDiff === 1 ? "1 day ago" : `${dayDiff} days ago`;
  }
};

const PostList = ({ subreddit, isDarkMode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("new");

  useEffect(() => {
    fetchPosts();
  }, [subreddit, selectedFilter]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const searchQuery = encodeURIComponent(`subreddit:${subreddit}`);
      const sort = selectedFilter;
      const limit = 25;

      const response = await fetch(
        `https://www.reddit.com/search.json?q=${searchQuery}&sort=${sort}&limit=${limit}`,
      );
      const data = await response.json();
      if (data && data.data && data.data.children) {
        const postData = data.data.children.map((child) => {
          const post = child.data;
          return {
            id: post.id,
            title: post.title,
            content: post.selftext,
            image: post.thumbnail,
            author: post.author,
            time: post.created_utc,
            numOfComments: post.num_comments,
            upvotes: post.ups,
          };
        });
        setPosts(postData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  return (
    <div className={isDarkMode ? styles.darkMode : styles.lightMode}>
      <FilterButtons
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
      <div className="post-list">
        {loading ? (
          <div className={styles.loadingContainerStyles}>
            <div className="loader"></div>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={styles.cardStyle}>
              <p className={styles.subredditStyle}>r/{subreddit}</p>

              <Link
                to={`/post/${
                  post.id
                }?subreddit=${subreddit}&postContent=${encodeURIComponent(
                  post.content,
                )}&upvotes=${encodeURIComponent(post.upvotes)}&numOfComments=${
                  post.numOfComments
                }`}
                className={styles.linkStyles}
              >
                <div className={styles.titleContainerStyle}>
                  {post.image && post.image !== "self" ? (
                    <img
                      src={post.image}
                      alt=""
                      className={styles.imageStyle}
                    />
                  ) : (
                    <FaPen />
                  )}
                  <h2 className={styles.titleStyles}>{post.title}</h2>
                  <div className={styles.upvotesContainerStyle}>
                    <FaArrowUp />
                    <span className={styles.upvotesStyle}>{post.upvotes}</span>
                  </div>
                </div>
              </Link>
              <p className={styles.postInfoStyles}>
                Posted by: {post.author} | {formatTime(post.time)} |{" "}
                <FaComment /> {post.numOfComments}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
