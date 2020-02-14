import React, { Component } from "react";
import Link from "next/link";

export default class AudioList extends Component {
  render() {
    const { audioClips } = this.props;

    return (
      <div className="audio_wrapper">
        <p className="audio_title">Ultimos Podcasts</p>
        <ul>
          {audioClips.map(audio => (
            <li key={audio.id}>
              <Link href={`/podcast?id=${audio.id}`}>
                <a className="audio_item">
                  <div className="audio_info">
                    <p>{audio.title}</p>
                    <span>{audio.description}</span>
                  </div>
                  <div className="icon-play">
                    <div className="clock-solid icon"></div>
                    <span className="audio_duration">
                      {Math.ceil(audio.duration / 60)} min
                    </span>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <style jsx>{`
          .audio_title {
            text-align: center;
            font-size: 0.9em;
            color: #777;
            margin: 1em 0;
          }
          .audio_wrapper {
            padding: 0 10px;
          }

          .audio_wrapper ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .audio_wrapper h3 {
            color: #8756ca;
          }

          .audio_wrapper li {
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            padding: 0.5em 0;
          }

          .audio_item {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .audio_info {
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .audio_info p {
            font-weight: bold;
            margin: 0;
          }

          .audio_info span {
            display: block;
            font-size: 0.9em;
            color: #777;
            margin-top: 5px;
          }

          .audio_duration {
            display: block;
            font-size: 0.85em;
            color: #777;
            width: 50px;
          }

          .icon-play {
            text-align: center;
          }

          .clock-solid.icon {
            color: #8756ca;
            position: relative;
            margin: auto;
            margin-bottom: 0.5em;
            width: 15px;
            height: 15px;
            background-color: currentColor;
            border: solid 1px currentColor;
            border-radius: 8px;
          }

          .clock-solid.icon:before {
            content: "";
            position: absolute;
            top: 7px;
            left: 7px;
            width: 5px;
            height: 1px;
            color: white;
            background-color: currentColor;
            -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
          }

          .clock-solid.icon:after {
            content: "";
            position: absolute;
            top: 2px;
            left: 7px;
            width: 1px;
            height: 6px;
            color: white;
            background-color: currentColor;
            -webkit-transform-origin: 0% 0%;
            transform-origin: 0% 0%;
          }
        `}</style>
      </div>
    );
  }
}
