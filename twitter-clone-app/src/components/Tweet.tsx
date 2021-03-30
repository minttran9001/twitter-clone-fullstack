import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import Modal from "react-modal";
import { customStyles } from "../styles/modalStyles";
import * as yup from "yup";
const CREATE_TWEET_MUTATION = gql`
  mutation createTweet($content: String) {
    createTweet(content: $content) {
      id
    }
  }
`;
interface ProfileValues {
  content: string;
}
const Tweet = () => {
  const [createTweet] = useMutation(CREATE_TWEET_MUTATION);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const initialValues: ProfileValues = {
    content: "",
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
  return (
    <>
      <button
        style={{ background: "#78A1D1" }}
        onClick={openModal}
        className="form-control mt-5 text-white d-block"
      >
        Tweet
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal Create"
        style={customStyles}
        ariaHideApp={false}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const content = values.content.replace(/\n/g, `<br>${"  "}\n`);
            const arr = content.split(" ");

            arr.forEach((text, index) => {
              const hashtag = text.replace(/\s/g, "").startsWith("#");
              if (hashtag) {
                arr[index] = `
        <span class='hight-light' style='color:#78A1D1'>${arr[index]}</span>
        `;
              }
            });            
            await createTweet({
              variables: { content: arr.join(" ") },
            });
            closeModal();

            setSubmitting(false);
          }}
        >
          <Form className=" w-100">
            <Field
              style={{ height: 200 }}
              className="form-control  my-2"
              name="content"
              as="textarea"
              type="text"
              placeholder="Write a tweet"
            />
            <ErrorMessage
              className="text-danger"
              name="content"
              component={"small"}
            />
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
export default Tweet;
