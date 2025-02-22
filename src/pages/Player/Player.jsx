import React, { useEffect, useState } from "react";
import "./player.css";
import { FaBackward } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODU4MjM5MDAyNjhjM2JkMDg0OWQ5OThhNmUyOTMyOCIsIm5iZiI6MTczOTYxMzYzNS4zMzYsInN1YiI6IjY3YjA2NWMzMWYzODQxZWUxNzZjNDJjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5C3tDNitm-Rh7BkgGxT15G_k3xoP5CUts35IhkUIPsY",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setApiData(res.results[0]);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="player">
      <Link to="/">
        <FaBackward className="back-icon" />
      </Link>
      <iframe
        width="90%"
        height="100%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <div className="player_info">
        <p>{apiData?.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;

// {
//   "id": 822119,
//   "results": [
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Welcome To The MCU",
//       "key": "TlbLxrWiwPI",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-16T17:20:50.000Z",
//       "id": "67b39e01e0d9f833bc6da874"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Xosha Roquemore on Joining the MCU!",
//       "key": "aF4fHL_lljg",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-15T19:30:00.000Z",
//       "id": "67b39e0aa65d6303e7e0ee01"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Tim Blake Nelson’s Return to the MCU as Samuel Sterns After 16 Years",
//       "key": "-mZxjx-xQmQ",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-15T17:30:00.000Z",
//       "id": "67b39e14a65d6303e7e0ee06"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "#1 Movie in the World",
//       "key": "f3jP5zH3TB4",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-15T17:00:49.000Z",
//       "id": "67b39e1fa65d6303e7e0ee17"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Marvel fans pose with Sam Wilson's Shield at the Premiere!",
//       "key": "uvv4RyHQ9QQ",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-14T22:30:08.000Z",
//       "id": "67b39df9d187fac09b9fafa6"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Shira Haas on Fight Training and Stepping Into Her Character Ruth Bat-Seraph",
//       "key": "xGf8eRU4Inc",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-14T22:00:47.000Z",
//       "id": "67afc29a1f3841ee176c33ae"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Liv Tyler on Her Return to Betty Ross",
//       "key": "7sViT5MtP68",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-14T21:00:04.000Z",
//       "id": "67afb5751f3841ee176c3267"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Now Playing in Theaters",
//       "key": "QbHrBkglhf0",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-14T16:00:36.000Z",
//       "id": "67af728f9669ff44cc3b6f55"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Director Julius Onah on Introducing Sam Wilson as Captain America",
//       "key": "reWz94lR_Fc",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-13T21:30:07.000Z",
//       "id": "67af59aa2506e5fd303b60fe"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Carl Lumbly Playing Isaiah Bradley Is a “Privilege and an Honor”",
//       "key": "o89bucAU-lA",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-13T20:30:10.000Z",
//       "id": "67af59b3f68e724f201cc765"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Unboxing with Anthony Mackie & Danny Ramirez",
//       "key": "OZMaZWNi2nw",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-13T18:00:17.000Z",
//       "id": "67af59bff68e724f201cc771"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Tonight",
//       "key": "A2_gUHEWGhc",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-13T17:00:11.000Z",
//       "id": "67af59cce7908d6cc48e768c"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Red Carpet Premiere!",
//       "key": "tDGEh3t2zww",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-13T16:01:07.000Z",
//       "id": "67af59d880f76d61eb8e77d6"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Best Red Carpet Moments!",
//       "key": "Mb_cFGXCHcs",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-13T15:00:34.000Z",
//       "id": "67af59e16d1a7b60523b71c6"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Get Tickets Now",
//       "key": "e1QtjdRqyAI",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-13T03:00:51.000Z",
//       "id": "67af59ebe7908d6cc48e7693"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official IMAX® Interview",
//       "key": "BSqZWSYlJx4",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-13T00:03:13.000Z",
//       "id": "67b260fb7294be98a8e0f35d"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Harrison Ford on Joining the Marvel Cinematic Universe",
//       "key": "6Ai71XGDcTI",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-12T19:30:01.000Z",
//       "id": "67af59f4f68e724f201cc784"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Danny Ramirez on Suiting Up and Embodying Joaquin Torres’s Falcon",
//       "key": "C-We-xc04qA",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-12T18:30:21.000Z",
//       "id": "67af59fb6d1a7b60523b71cd"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Anthony Mackie's Full-Circle Moment of Becoming Captain America",
//       "key": "RfawInGQUAY",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-12T17:30:10.000Z",
//       "id": "67af5a062506e5fd303b6121"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Unleashing The Red Hulk",
//       "key": "PMw_hXt9wZs",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-12T17:00:27.000Z",
//       "id": "67af5a1ff68e724f201cc791"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Get Tickets Now",
//       "key": "YWoQKQINwFk",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-10T17:00:38.000Z",
//       "id": "67aa4d73a2e2f99ed4bb0882"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "IMAX Promo",
//       "key": "jols7MAViRU",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-07T16:45:24.000Z",
//       "id": "67a948b81ca858ae1105febf"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "New York",
//       "key": "88J2oIF_KNc",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-07T16:00:13.000Z",
//       "id": "67a8c2b05fa42d7e76f13e24"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Nellis Air Force Base",
//       "key": "-b6OTXSuUGs",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-02-05T15:30:00.000Z",
//       "id": "67a477bb43781b4bfa2fd180"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "\"You Need A Minute\" Clip",
//       "key": "fdiTbD5BBPc",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Clip",
//       "official": false,
//       "published_at": "2025-02-04T01:20:37.000Z",
//       "id": "67a2115f0f96f416df030dce"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "In Theaters in 10 Days",
//       "key": "fRg-T-6rDUg",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-03T18:00:34.000Z",
//       "id": "67a177da9a24fca660260dd8"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official Clip 'Rebuild The Avengers'",
//       "key": "Ju1COoyZ2y0",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Clip",
//       "official": true,
//       "published_at": "2025-02-03T17:00:31.000Z",
//       "id": "67a0fbbcac5a7951b9cba0aa"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Get Tickets Now",
//       "key": "3HoLJ5lh270",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-02-01T20:00:02.000Z",
//       "id": "67a086e2f0f9dbdba6958468"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "In Theaters in Two Weeks",
//       "key": "lv43QBpLu8k",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-01-31T17:00:56.000Z",
//       "id": "67a084d37ebb0614ff266c9d"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "American Family Insurance – Like Your Shield",
//       "key": "mksHCca3fAg",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-01-23T21:30:06.000Z",
//       "id": "67931f25d5f9fe6cfc48336e"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "First Look",
//       "key": "CiDsOfBE8L0",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Behind the Scenes",
//       "official": true,
//       "published_at": "2025-01-21T17:00:25.000Z",
//       "id": "67906441d8100c6d79dfebd4"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "It's Time",
//       "key": "OcUy1pki-Og",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2025-01-18T17:00:20.000Z",
//       "id": "678c5839859fb4e6a86de3ae"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Let's go!",
//       "key": "hAhvFIxvI7M",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Featurette",
//       "official": true,
//       "published_at": "2025-01-17T18:00:37.000Z",
//       "id": "678c585d08dd708bb96df15f"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Behind-the-Scenes",
//       "key": "BkkMibQwA44",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Behind the Scenes",
//       "official": true,
//       "published_at": "2025-01-17T17:20:38.000Z",
//       "id": "678e66ae5add61273d6554d0"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Get Tickets Now",
//       "key": "5PSzFLV-EyQ",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Trailer",
//       "official": true,
//       "published_at": "2025-01-17T14:00:06.000Z",
//       "id": "678c588108dd708bb96df167"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Only in Theaters February 14",
//       "key": "uJYTz1CgN14",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2024-12-31T17:01:04.000Z",
//       "id": "6777125582cce15a76748969"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Special Look",
//       "key": "SWZyuEQPQYo",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2024-12-13T17:00:35.000Z",
//       "id": "675caffcaf5e84b3fe6cfff1"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official IMAX Trailer",
//       "key": "QUYZjYULUAA",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Trailer",
//       "official": true,
//       "published_at": "2024-11-09T22:14:44.000Z",
//       "id": "6733bb8d57cee02f7d442119"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official Trailer",
//       "key": "1pHDWnXmK7Y",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Trailer",
//       "official": true,
//       "published_at": "2024-11-09T21:16:06.000Z",
//       "id": "672fd15b5a65bb8190dd30ad"
//     },
//     {
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "name": "Official Teaser",
//       "key": "O_A8HdCDaWM",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Teaser",
//       "official": true,
//       "published_at": "2024-07-12T13:00:02.000Z",
//       "id": "66912a1d971482190be1131e"
//     }
//   ]
// }
