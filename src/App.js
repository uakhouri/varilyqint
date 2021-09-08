// import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import "./App.css";

function App() {
  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [dataSearch, setDataSearch] = useState("");
  let Searchbar = [];

  // const [updatePhoto, setUpdate] = useState({});
  let updatePhoto = {};
  let dataArray = [];
  // const [update, setUpdate] = useState([]);
  // let data = {};
  useEffect(getAlbum, []);

  function getAlbum() {
    fetch("https://jsonplaceholder.typicode.com/albums/?_limit=5").then(
      (result) =>
        result.json().then((resp) => {
          // console.log(resp);
          setAlbum(resp);
        })
    );

    // for (let i = 1; i <= 10; i++)
    fetch(`https://jsonplaceholder.typicode.com/photos`).then((result) =>
      result.json().then((resp) => {
        // console.log(resp);
        setPhotos(resp);
      })
    );
  }
  // // console.log(album);
  // for (let i in album) {
  //   updatePhoto[album[i].id] = {};
  //   setUpdate((album[i].id = {}));
  // }
  // console.log("Update photo using useState before ", updatePhoto);

  for (let ele in album) {
    console.log("Key under check of UpdatePhoto", album[ele].id);
    for (let item in photos) {
      if (Number(album[ele].id) === Number(photos[item].albumId)) {
        if (Number(photos[item].id) <= Number(album[ele].id - 1) * 50 + 10) {
          // console.log("items", item);
          // console.log("Item under check", item);
          Searchbar.push(photos[item].title);
          let dataPass = {
            id: photos[item].id,
            title: photos[item].title,
            url: photos[item].url,
            thumbnailUrl: photos[item].thumbnailUrl,
          };
          // console.log("Data Array", dataArray);
          dataArray.push(dataPass);
        }
      }
    }
    console.log("Type of Searchbar", typeof Searchbar);
    updatePhoto[ele] = dataArray;
    dataArray = [];
  }
  console.log("UpdatePhoto after scanning", updatePhoto);
  console.log("type of UpdatePhoto after scanning", typeof updatePhoto);
  function getRndInteger(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    if (num > 75) {
      return (
        <h3 className="random" style={{ color: "green" }}>
          ${num}
        </h3>
      );
    } else {
      return (
        <h3 style={{ color: "red" }} className="random">
          ${num}
        </h3>
      );
    }
  }

  return (
    <div className="App">
      <input
        type="search"
        className="Inputbar"
        placeholder="See your Financial Report"
        onChange={(e) => setDataSearch(e.target.value)}
      />

      {album.map((data) => {
        return (
          <div className="AlbumHead">
            <h1 className="AlbHead">{data.title}</h1>
            <div>
              {updatePhoto[data.id - 1]
                .filter((val) => {
                  if (dataSearch === " ") {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(dataSearch.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item) => {
                  return (
                    <div className="textBoxes">
                      <div className="Imagediv">
                        <img
                          src={item.thumbnailUrl}
                          className="Imagepos"
                          alt="thumbnail"></img>
                      </div>
                      <div className="LinkandText">
                        <h4 className="textin">{item.title}</h4>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="LinkA">
                          {item.url}
                        </a>
                        {getRndInteger(50, 250)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
