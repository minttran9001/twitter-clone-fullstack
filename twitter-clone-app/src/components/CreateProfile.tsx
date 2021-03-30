import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import gql from "graphql-tag";
import React from "react";
import { ME_QUERY } from "../pages/Profile";
import  Modal  from "react-modal";
import { customStyles } from "../styles/modalStyles";



const CREATE_PROFILE_MUTATION = gql`
  mutation createProfile(
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    createProfile(
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;
interface ProfileValues {
  bio: string;
  location: string;
  website: string;
  avatar: string;
}
const CreateProfile = () => {
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const initialValues: ProfileValues = {
    bio: "",
    location: "",
    website: "",
    avatar: "",
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  return (
    <div>
       <button  style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
            onClick={openModal} className="form-control w-20">
        Create Profile
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
          // validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await createProfile({
              variables: values,
            });
            closeModal()

            setSubmitting(false);
          }}
        >
          <Form className=" w-100">
            <Field
              className="form-control my-2"
              name="bio"
              type="text"
              as="textarea"
              placeholder="Your bio"
            />
            <ErrorMessage
              className="text-danger"
              name="bio"
              component={"small"}
            />
            <Field
              className="form-control my-2"
              name="location"
              type="text"
              placeholder="Location"
            />
            <ErrorMessage
              className="text-danger"
              name="location"
              component={"small"}
            />
            <Field
              className="form-control my-2"
              name="website"
              type="text"
              placeholder="Website"
            />
            <ErrorMessage
              className="text-danger"
              name="text"
              component={"small"}
            />

            <button
              style={{ background: "#78A1D1" }}
              className=" mt-3 text-white form-control text-10"
              type="submit"
            >
              Create Profile
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};
export default CreateProfile;
