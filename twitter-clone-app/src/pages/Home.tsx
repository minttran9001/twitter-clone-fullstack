import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import noavt from "../assets/images/noavt.png";
import Header from "../components/Header";
import Loading from "../components/Loading";
import TweetCard from "../components/TweetCard";
import { ME_QUERY } from "./Profile";

export const TWEETS_QUERY = gql`
  query TWEETS_QUERY {
    tweets {
      id
      createdAt
      content
      files
      likes {
        id
      }
      comments {
        id
      }
      author {
        id
        name
        Profile {
          id
          avatar
        }
      }
    }
  }
`;
const CREATE_TWEET_MUTATION = gql`
  mutation createTweet($content: String, $files: String) {
    createTweet(content: $content, files: $files) {
      id
    }
  }
`;
export interface TweetValues {
  id: number;
  likes: [];
  comments: [];
  files: string;
  meData: any;
  createdAt: Date;
  content: string;
  author: {
    id: number;
    name: string;
    Profile: {
      id: number;
      avatar: string;
    };
  };
}

const Home = () => {
  const { loading, error, data } = useQuery(TWEETS_QUERY);
  const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
    refetchQueries: [{ query: TWEETS_QUERY }],
  });
  const {
    loading: meLoading,
    error: meError,
    data: meData,
    refetch: meRefetch,
  } = useQuery(ME_QUERY);
  React.useEffect(() => {
    meRefetch();
  }, []);

  const [tweet, setTweet] = React.useState("");
  const inputFile = React.useRef<HTMLInputElement | null>(null);
  const [tweetImage, setTweetImage] = React.useState<FileList[]>([]);
  const handlePostTweet = async () => {
    const content = tweet.replace(/\n/g, `<br>${"  "}\n`);
    const arr = content.split(" ");
    let files = [];
    const formData = new FormData();
    if (tweetImage.length > 0) {
      for (let i = 0; i < tweetImage.length; i++) {
        formData.append("file", tweetImage[i][0]);
        formData.append("upload_preset", "xqntpxoh");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/mint-twitter-clone/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        files.push((await res.json()).secure_url);
      }
      arr.forEach((text, index) => {
        const hashtag = text.replace(/\s/g, "").startsWith("#");
        if (hashtag) {
          arr[
            index
          ] = `<span class='hight-light' style='color:#78A1D1'>${arr[index]}</span>`;
        }
      });
      const result = await createTweet({
        variables: { content: arr.join(" "), files: files.join(" , ") },
      });

      setTweet("");
      setTweetImage([]);
    }
  };

  const openFileBox = () => {
    if (inputFile.current != null) {
      inputFile.current.click();
    }
  };
  const upLoadFile = (e: React.ChangeEvent<HTMLInputElement>, maxSize = 10) => {
    const files = e.target.files;

    if (files && files?.length > 0) {
      if (files[0].size / 1000000 < maxSize) {
        const newArr = [...tweetImage];
        newArr.push(files);
        setTweetImage(newArr);
      } else {
        console.log("Use file under 10MB");
      }
    }
  };
  const renderTweet = () => {
    let tweetsArr = new Array<any>();
    meData.me.Following.forEach((userFollowed: any, index: number) => {
      const arr = userFollowed.UserFollowed.tweets;
      tweetsArr = [...arr, ...tweetsArr];
    });

    return tweetsArr
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .map((item: any, index: number) => (
        <TweetCard
          key={String(item.createdAt)}
          comments={item.comments}
          userData={meData.me}
          id={item.id}
          files={item.files}
          likes={item.likes ? item.likes : []}
          createdAt={item.createdAt}
          content={item.content}
          authorId={item.author.id}
          name={item.author.name}
          avatar={item.author.Profile.avatar}
        />
      ));
  };
  if (loading) return <Loading />;
  if (meLoading) return <Loading />;
  if (error) return <>{error.message}</>;
  if (meError) return <>{meError.message}</>;
  return (
    <div className="text-dark  w-100">
      <Header>Home</Header>
      <input
        name="file"
        id="file"
        onChange={upLoadFile}
        type="file"
        ref={inputFile}
        style={{ visibility: "hidden" }}
      />
      <div className="d-flex w-100 mb-5 justify-content-between p-4">
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            overflow: "hidden",
          }}
          className="ml-2 "
        >
          <img
            src={
              meData.me.Profile && meData.me.Profile.avatar
                ? meData.me.Profile.avatar
                : noavt
            }
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
            alt="Avatar"
          />
        </div>
        <div className=" ml-3 w-100 h-100">
          <textarea
            value={tweet}
            style={{ height: 150 }}
            onChange={(e: any) => setTweet(e.target.value)}
            className="form-control w-100 "
            placeholder="What's happening"
          ></textarea>
          <div
            className={
              tweetImage.length > 1
                ? "container-fluid my-4 grid-image"
                : "container-fluid   my-4"
            }
          >
            {tweetImage &&
              tweetImage.length > 0 &&
              tweetImage.map((item: FileList, index: any) => (
                <div
                  key={index}
                  style={{ width: "100%", height: 300 }}
                  className="  rounded overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(tweetImage[index][0])}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="tweet file"
                  />
                </div>
              ))}
          </div>

          <div className="d-flex mt-3 justify-content-between">
            <div style={{ color: "#78A1D1" }} className="d-flex btn">
              <svg
                onClick={openFileBox}
                className="mr-2"
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>

              <svg
                className="mr-2"
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              <svg
                className="mr-2"
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <svg
                className="mr-2"
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                className="mr-2"
                style={{ width: 30 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <button
                onClick={handlePostTweet}
                style={{ background: "#78A1D1" }}
                className="btn text-white  form-control"
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
      {renderTweet()}
    </div>
  );
};
export default Home;
