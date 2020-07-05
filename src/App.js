import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [imagesNames, setImageNames] = useState([]);
  const [imageCount, setImageCount] = useState(3);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/images`)
      .then((response) => {
        let images = [];
        response.data.ids.map((id) => {
          images.push({
            filename: id,
            datetime: new Date(parseInt(id.split(" ")[1].split(".")[0])),
            sender: id.split(" ")[0],
          });
        });
        setImageNames(images);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (imageCount + 3 >= imagesNames.length)
        setImageCount(imagesNames.length);
      else setImageCount(imageCount + 3);
    }
  };

  return (
    <div className="ImageList">
      {imagesNames.slice(0, imageCount).map((imageObject) => {
        return (
          <div key={imageObject.filename}>
            <p>{`${imageObject.sender} ${imageObject.datetime.toLocaleString(
              "en-GB"
            )}`}</p>

            <a
              href={`${process.env.REACT_APP_API_URL}/images/${imageObject.filename}`}
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/images/previews/${imageObject.filename}`}
                alt={imageObject.filename}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default App;
