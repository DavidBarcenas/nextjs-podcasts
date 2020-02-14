import React, { Component } from "react";
import Link from "next/link";

export default class channel extends Component {
  static async getInitialProps({ query }) {
    let idChannel = query.id;

    let [reqChannel, reqAudio, reqChildChannels] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ]);

    // get channel data
    const channel = (await reqChannel.json()).body.channel;
    // get channel audios
    const audioClips = (await reqAudio.json()).body.audio_clips;
    // get channel series
    const childChannels = (await reqChildChannels.json()).body.channels;

    return { channel, audioClips, childChannels };
  }
  render() {
    const { channel, audioClips, childChannels } = this.props;
    return (
      <>
        <header>
          <Link href="/">
            <a className="back">
              <div className="arrow-left icon"></div>
            </a>
          </Link>
          <div className="title">{channel.title}</div>
        </header>

        <figure className="channel_header">
          <div
            className="layer_blur"
            style={{
              backgroundImage: `url(${channel.urls.logo_image.original})`
            }}
          ></div>
          <img src={channel.urls.logo_image.original} alt={channel.title} />
          <figcaption>
            <p>{channel.description}</p>
            <div className="channel_audio_count">
              <span>{channel.channel_clips_count}</span>
              <span> audios</span>
            </div>
          </figcaption>
        </figure>

        {audioClips.length > 0 && (
          <ul className="audio_wrapper">
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
                        {(audio.duration / 60).toFixed(2)} min
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {childChannels.length > 0 && (
          <div className="audio_wrapper">
            <h3>Relacionados</h3>
            <div className="child_grid">
              {childChannels.map(child => (
                <Link href={`/channel?id=${child.id}`} key={child.id}>
                  <a>
                    <img
                      src={child.urls.logo_image.original}
                      alt={child.title}
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            font-weight: bold;
            padding: 15px;
            position: relative;
          }
          header .title {
            margin: auto;
            max-width: 70%;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .channel_header {
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            color: #fff;
            margin: 0;
            text-align: center;
            position: relative;
          }
          .channel_header .layer_blur {
            background-position: center center;
            background-size: cover;
            filter: brightness(0.4) blur(1px);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
          }
          .channel_header img {
            max-width: 130px;
            box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
            margin: 1em 0;
          }
          .channel_header figcaption {
            background: rgba(0, 0, 0, 0.45);
            font-size: 0.9em;
            padding: 0.5em;
          }
          .channel_header p {
            margin-bottom: 0;
          }
          .channel_audio_count {
            color: #fff;
            margin: 1em 0 0.5em;
            text-align: right;
          }

          .audio_wrapper {
            padding: 0 10px;
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
            width: 75%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .audio_info p {
            font-weight: bold;
            margin: 0;
          }

          .audio_info span {
            font-size: 0.9em;
            color: #777;
          }

          .audio_duration {
            display: block;
            font-size: 0.85em;
            color: #777;
          }

          .icon-play {
            text-align: center;
          }

          .child_grid {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }

          .child_grid img {
            max-width: 100%;
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

        <style jsx global>{`
          body {
            margin: 0;
            font-family: arial, sans-serif;
            background: #fffffa;
          }

          a {
            text-decoration: none;
            color: #292929;
          }

          .arrow-left.icon {
            color: #fff;
            position: absolute;
            margin-left: 3px;
            margin-top: 10px;
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
}
