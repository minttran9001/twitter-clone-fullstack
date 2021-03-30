import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { TWEETS_QUERY } from "../pages/Home";
import { ME_QUERY, UserValues } from "../pages/Profile";
const LIKE_TWEET_MUTATION = gql`
  mutation likeTweet($id: Int) {
    likeTweet(id: $id) {
      id
    }
  }
`;
const DELETE_LIKE_MUTATION = gql`
  mutation deleteLike($id: Int!) {
    deleteLike(id: $id) {
      id
    }
  }
`;

export interface LikeTweetValues {
  id: number;
  tweet: {
    id: number;
  };
  likes: [];
  userData: UserValues;
}
interface LikeTweetProps {
  tweet: {
    id: number;
  };
  likes: [];
  userData: UserValues;
}

const LikeTweet = ({ tweet, likes, userData }: LikeTweetProps) => {
  const [likeTweet] = useMutation(LIKE_TWEET_MUTATION, {
    refetchQueries: [{ query: TWEETS_QUERY }, { query: ME_QUERY }],
  });
  const [deleteLike] = useMutation(DELETE_LIKE_MUTATION, {
    refetchQueries: [{ query: TWEETS_QUERY }, { query: ME_QUERY }],
  });
  const handleLikeTweet = async () => {
    await likeTweet({
      variables: { id: tweet.id },
    })
      .then(() => {})
      .catch((err) => console.log(err));
  };
  const handleDeleteLike = async (likeId: number) => {
    await deleteLike({
      variables: { id: likeId },
    });
  };

  return (
    <div className="d-flex tweet-widget  text-muted btn align-items-center">
      {userData.likedTweet
        .map((t: LikeTweetProps) => t.tweet.id)
        .includes(tweet.id) ? (
        <div
          onClick={() =>
            handleDeleteLike(
              userData.likedTweet.filter(
                (like: LikeTweetProps) => like.tweet.id === tweet.id
              )[0].id
            )
          }
        >
          <svg
            style={{ width: 20 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="ml-2">{likes.length}</span>
        </div>
      ) : (
        <div onClick={handleLikeTweet}>
          <svg
            style={{ width: 20 }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="ml-2">{likes.length}</span>
        </div>
      )}
    </div>
  );
};
export default LikeTweet;
