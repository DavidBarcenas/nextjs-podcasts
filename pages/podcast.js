import React from "react";
import Link from "next/link";
import "isomorphic-fetch";

export default function Podcast(props) {
  const audio = props.audio.audio_clip;
  return (
    <>
      <div className="audio_wrapper">
        <Link href={`/channel?id=${audio.channel.id}`}>
          <a className="audio_back">
            <div className="arrow-left icon"></div> Volver
          </a>
        </Link>
        <div className="audio_poster">
          <img src={audio.urls.image} alt={audio.title} />
        </div>
        <div className="audio_player">
          <h2>{audio.title}</h2>
          <p>{audio.channel.title}</p>

          <audio src={audio.urls.high_mp3} controls />
        </div>
      </div>

      <style jsx>{`
        .audio_wrapper {
          background: #8756ca;
          height: 100vh;
          overflow: hidden;
        }

        .audio_back {
          color: #fff;
          display: block;
          padding: 1em;
        }

        .audio_poster,
        .audio_player {
          font-size: 0.9em;
          text-align: center;
          box-sizing: border-box;
        }

        .audio_poster {
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc((100% - 26%) - 60px);
        }

        .audio_poster img {
          max-width: 80%;
        }

        .audio_player {
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          padding: 1em 2em;
          position: fixed;
          bottom: 0;
          left: 0;
          height: 26%;
          width: 100%;
        }

        .audio_player h2 {
          font-size: 1.3em;
        }

        .audio_player p {
          margin-bottom: 2em;
        }

        .audio_player audio {
          width: 100%;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: arial, sans-serif;
        }

        a {
          text-decoration: none;
          color: #292929;
        }

        .arrow-left.icon {
          color: #fff;
          position: relative;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          width: 16px;
          height: 1px;
          background-color: currentColor;
        }
        .arrow-left.icon:before {
          content: "";
          position: absolute;
          left: 1px;
          top: -5px;
          width: 10px;
          height: 10px;
          border-top: solid 1px currentColor;
          border-right: solid 1px currentColor;
          -webkit-transform: rotate(-135deg);
          transform: rotate(-135deg);
        }
      `}</style>
    </>
  );
}

Podcast.getInitialProps = async ({ query }) => {
  let req = await fetch(
      `https://api.audioboom.com/audio_clips/${query.id}.mp3`
    ),
    { body: audio } = await req.json();
  return { audio };
};
