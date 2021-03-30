import { ErrorMessage, Field, Formik, Form } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import React from "react";
import { customStyles } from "../styles/modalStyles";
import Modal from "react-modal";
import { ME_QUERY } from "../pages/Profile";

const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: Int!
    $bio: String
    $location: String
    $website: String
    $avatar: String
  ) {
    updateProfile(
      id: $id
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
  id: Number;
  bio: string;
  location: string;
  website: string;
  avatar: string;
}

const UpdateProfile = () => {
  const { loading, error, data } = useQuery(ME_QUERY);
  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const initialValues: ProfileValues = {
    id: data.me.Profile && data.me.Profile.id,
    bio: data.me.Profile && data.me.Profile.bio,
    location: data.me.Profile && data.me.Profile.location,
    website: data.me.Profile && data.me.Profile.website,
    avatar: data.me.Profile && data.me.Profile.avatar,
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const inputFile = React.useRef<HTMLInputElement | null>(null);
  const [image, setImage] = React.useState<FileList | null>(null);
  const [isImageLoading, setImageLoading] = React.useState(false);
  const inputClick = () => {
    if (inputFile.current != null) {
      inputFile.current.click();
    }
  };
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files != null) {
      setImage(files);
    }
  };
  const handleUpdateProfile = async (
    values: ProfileValues,
    setSubmitting: any
  ) => {
    setSubmitting(true);
    let file;
    const formData = new FormData();
    if (image != null) {
      formData.append("file", image[0]);
      formData.append("upload_preset", "xqntpxoh");
      setImageLoading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/mint-twitter-clone/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      file = await res.json();
    }
    setImageLoading(false);

    updateProfile({
      variables: {
        ...values,
        avatar:
          file && file.secure_url
            ? file.secure_url
            : data.me.Profile && data.me.Profile.avatar,
      },
    })
      .then((e) => {
        console.log(e);
        closeModal();
        setSubmitting(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <button
        style={{ border: "1px solid #78A1D1", color: "#78A1D1" }}
        onClick={openModal}
        className="form-control w-20"
      >
        Update Profile
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal Update"
        style={customStyles}
        ariaHideApp={false}
      >
        <input
          type="file"
          className="d-none"
          style={{ transform: "translateY(100%)" }}
          name="file"
          id="file"
          ref={inputFile}
          onChange={uploadImage}
        />
        {isImageLoading ? (
          <p className="text-center font-weight-bold">Loading...</p>
        ) : (
          <>
            {data.me.Profile && data.me.Profile.avatar ? (
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="overflow-hidden"
                onClick={() => inputClick()}
              >
                <img
                  id="avatar-image"
                  src={
                    image === null
                      ? data.me.Profile.avatar
                      : URL.createObjectURL(image[0])
                  }
                  alt="Avatar"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            ) : image === null ? (
              <svg
                onClick={() => inputClick()}
                style={{ width: 150 }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            ) : (
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
                className="overflow-hidden"
                onClick={() => inputClick()}
              >
                <img
                  id="avatar-image"
                  src={URL.createObjectURL(image[0])}
                  alt="Avatar"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            )}
          </>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={(values: ProfileValues, { setSubmitting }: any) => {
            handleUpdateProfile(values, setSubmitting);
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
              type="website"
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
              Update Profile
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};
export default UpdateProfile;
