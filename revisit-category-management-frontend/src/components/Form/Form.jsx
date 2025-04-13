import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiUpload } from "react-icons/fi";

import "./Form.css";

const Form = ({ submit, close }) => {
  const [name, setName] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (image) {
      initiateUploadPostApi();
    }
  }, [image]);

  const initiateUploadPostApi = async () => {
    if (!image) {
      return;
    }
    const preset = "categories";
    const cloudName = "dmui27xl3";

    const postData = new FormData();

    postData.append("file", image);
    postData.append("upload_preset", preset);
    postData.append("cloud_name", cloudName);

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const options = {
      method: "POST",
      body: postData,
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setUrl(data.secure_url);
      }
    } catch (error) {
      console.log("Error on uploading post image: ", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !itemCount || !image) {
      alert("Required all the fields");
      return;
    }

    const newCategory = {
      name,
      itemCount,
      image: url,
    };

    submit(newCategory);
    close();
  };

  return (
    <div className="form-container">
      <form>
        <button className="close-button" onClick={close}>
          <IoMdClose className="close-icon" />
        </button>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Items count"
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)}
        />
        <label htmlFor="image">
          <FiUpload className="upload-icon" />
          Upload Image
        </label>
        <input
          id="image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          disabled={url === null}
          type="submit"
          onClick={handleSubmit}
          className={url === null ? "add-disabled-button" : "add-button"}
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default Form;
