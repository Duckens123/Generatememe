import React, { useState, useEffect } from "react";

const Index = () => {
  const [data, setData] = useState([]);
  const [limit, setlimit] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const jsonData = await response.json();
        setData(jsonData.data.memes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const next = () => {
    alert(process.env.REACT_APP_USERNAME);
    setlimit(limit + 10);
    alert(limit);
  };
  const back = () => {
    setlimit(limit - 10);
  };

  const [generate, setGenerate] = useState({
    text0: "",
    text1: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [templateId, settemplateId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `https://api.imgflip.com/caption_image?username=${
        process.env.REACT_APP_USERNAME
      }&password=${
        process.env.REACT_APP_PASSWORD
      }&template_id=${templateId}&text0=${encodeURIComponent(
        generate.text0
      )}&text1=${encodeURIComponent(generate.text1)}`,
      {
        method: "POST",
        body: "",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onImageClick = (event, imageId) => {
    settemplateId(imageId);
  };
  const handleChange = (e) => {
    setGenerate({ ...generate, [e.target.name]: e.target.value });
  };

  const handleDownload = () =>{
    setImageUrl("")
    setGenerate.text0="";
    setGenerate.text1="";
  }

  return (
    <div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Generate meme
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">
                  Text 1
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="text0"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Text 2
                </span>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="text1"
                />
              </div>
            </div>
            {imageUrl && <img width={200} src={imageUrl} alt="Generated Meme" />}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {imageUrl && <a
              href={imageUrl}
                type="button"
                class="btn btn-warning"
                onClick={handleDownload}
              >
                Download
              </a>}
              <button type="button" onClick={handleSubmit} class="btn btn-primary">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul>
        <li>Ajoute teks yo</li>
        <li>chwazi imaj</li>
        <li>klike sou jenere</li>
      </ul>
      <div className="d-flex justify-content-center">
      </div>
      <div className="col-md-12 row d-flex justify-content-center">
        {data.slice(limit - 10, limit).map((item) => (
          <div className="col-md-4">
            
            <img
              onClick={(event) => onImageClick(event, item.id)}
              width="60%"
              className=""
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              src={item.url}
              alt={item.name}
            />
          </div>
        ))}
      </div>
      <div className=" col-md-12 d-flex justify-content-evenly">
        <div className="col-md-5">
          <button className="btn btn-info" onClick={back} type="">
            Back
          </button>
        </div>
        <div className="col-md-5">
          <button className="btn btn-primary" onClick={next} type="">
            Next
          </button>
        </div>
      </div>
      {imageUrl && <img src={imageUrl} alt="Generated Meme" />}
    </div>
  );
};

export default Index;
