import React, { useRef } from "react";
import "./imageGenerator.css";
import default_image from "../default_image.png";

export const ImageGenerator = () => {
  const [image_url1, setImage_url1] = React.useState("/");
  const [image_url2, setImage_url2] = React.useState("/");
  const [image_url3, setImage_url3] = React.useState("/");
  const [image_url4, setImage_url4] = React.useState("/");
  const [loading, setLoading] = React.useState(false);
  const inputRef = useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      alert("Please enter your text");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer sk- rZpPd2Fb6ZaE4WHO2R9ZT3BlbkFJnTTk6KX1II7C1ZrNvzdD`,
          },
          body: JSON.stringify({
            prompt: `A photo of a ${inputRef.current.value}`,
            n: 4,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        const data_array = data.data;
        setImage_url1(data_array[0].url);
        setImage_url2(data_array[1].url);
        setImage_url3(data_array[2].url);
        setImage_url4(data_array[3].url);
        setLoading(false);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert("Error: " + errorData.error.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Request failed. Please try again later.");
    }
  };

  return (
    <>
      <div className="imageGenerator">
        <div className="imageGenerator__header">
          <h1>
            Image <span>Generator</span>
          </h1>
        </div>
        <div className="imageGenerator__body">
          <img
            src={image_url1 === "/" ? default_image : image_url1}
            alt="default_image"
          />
          <img
            src={image_url2 === "/" ? default_image : image_url2}
            alt="default_image"
          />
          <img
            src={image_url3 === "/" ? default_image : image_url3}
            alt="default_image"
          />
          <img
            src={image_url4 === "/" ? default_image : image_url4}
            alt="default_image"
          />
        </div>
        <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
        <div className={loading ? "loading-text" : "display-none"}>
          loading...
        </div>
        <div className="imageGenerator__footer">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Enter your text here"
          />
          <button
            onClick={() => {
              generateImage();
            }}
          >
            Generate
          </button>
          <div />
        </div>
      </div>
    </>
  );
};
