import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import Modal from "react-modal";
import { customStyles } from "../styles/modalStyles";
import * as yup from "yup";
import noavt from "../assets/images/noavt.png";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { UserValues } from "../pages/Profile";
import { COMMENT_QUERY } from "../components/CommentCard";
const CREATE_REPLY_MUTATION = gql`
  mutation createReply($content: String!, $id: Int!, $commentId: Int) {
    createReply(content: $content, id: $id, commentId: $commentId) {
      id
    }
  }
`;

interface ReplyValues {
  content: string;
  id: number;
  commentId: number;
}
interface ReplyTweetProps {
  userData: UserValues;
  id: number;
  createdAt: Date;
  reply: [];
  content: string;
  refetch():void
  authorId: number;
  name: string;
  avatar: string;
  commentId: number;
}
const CreateReply = (props: ReplyTweetProps) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [createReply] = useMutation(CREATE_REPLY_MUTATION, {
    refetchQueries: [
      { query: COMMENT_QUERY, variables: { commentId: props.id } },
    ],
  });
  const initialValues: ReplyValues = {
    content: "",
    id: props.id,
    commentId: props.commentId,
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const validationSchema = yup.object({
    content: yup
      .string()
      .required()
      .min(1, "Must be more than 1 character")
      .max(256, "Must be less than 257 characters"),
  });

  const handleReplyComment = (values: ReplyValues, setSubmitting: any) => {
    setSubmitting(true);

    createReply({
      variables: values,
    })
      .then(() => {
        props.refetch()
        setSubmitting(false);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
  };

  return (
    <>
      <div
        onClick={openModal}
        className="d-flex tweet-widget text-muted btn align-items-center"
      >
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
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
        <span className="ml-2">{props.reply.length}</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal Reply"
        style={customStyles}
        ariaHideApp={false}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleReplyComment(values, setSubmitting);
          }}
        >
          <Form className=" w-100 p-3">
            <div className="d-flex align-items-start">
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="mr-3"
              >
                <img
                  src={props.avatar ? props.avatar : noavt}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Avatar"
                />
              </div>
              <div className="d-flex w-100 pr-4 pl-2 flex-column">
                <div className="d-flex w-100 justify-content-between align-items-start">
                  <div className="d-flex  align-items-end">
                    <p className="fs-1 font-weight-bold mr-2">{props.name}</p>
                    <p>
                      @{props.name}
                      {props.authorId}2131 &nbsp;{" "}
                    </p>
                    <p style={{ fontSize: 10 }}>
                      {"  "} - {moment(props.createdAt).fromNow()}
                    </p>
                  </div>
                  <svg
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
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
                <div className="">
                  <p
                    className="reply-content"
                    dangerouslySetInnerHTML={{ __html: props.content }}
                  ></p>
                </div>
                <div
                  style={{ fontSize: 12 }}
                  className="my-3 font-italic font-weight-bold"
                >
                  Replying to{" "}
                  <span style={{ color: "#78A1D1", cursor: "pointer" }}>
                    {" "}
                    @{props.name}
                    {props.authorId}2131 &nbsp;{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="mr-3"
              >
                <img
                  src={
                    props.userData.Profile.avatar
                      ? props.userData.Profile.avatar
                      : noavt
                  }
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Avatar"
                />
              </div>
              <div className="w-100">
                <Field
                  style={{ height: 100 }}
                  className="form-control  my-2"
                  name="content"
                  as="textarea"
                  type="text"
                  placeholder="Reply this comment"
                />
                <ErrorMessage
                  className="text-danger"
                  name="content"
                  component={"small"}
                />
              </div>
            </div>

            <p id="test"></p>

            <button
              style={{ background: "#78A1D1" }}
              className=" mt-3 text-white w-25 float-right form-control text-10"
              type="submit"
            >
              Post
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
export default CreateReply;
