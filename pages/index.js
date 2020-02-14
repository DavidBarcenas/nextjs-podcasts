import React, { Component } from "react";
import Link from "next/link";
import "isomorphic-fetch";

export default class index extends Component {
  static async getInitialProps() {
    let req = await fetch("https://api.audioboom.com/channels/recommended"),
      { body: channels } = await req.json();
    return { channels };
  }

  render() {
    const { channels } = this.props;
    return (
      <>
        <header>Podcasts</header>

        <div className="channels">
          {channels.map(channel => (
            <Link href={`/channel?id=${channel.id}`} key={channel.id}>
              <a className="channel">
                <figure>
                  <img
                    src={channel.urls.logo_image.original}
                    alt={channel.title}
                  />
                  {/* <figcaption>{channel.title}</figcaption> */}
                </figure>
              </a>
            </Link>
          ))}
        </div>

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            font-weight: bold;
            padding: 15px;
            text-align: center;
          }
          .channels {
            display: grid;
            grid-gap: 5px 10px;
            padding: 10px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          .channel {
            display: block;
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
            margin-bottom: 0.5em;
          }
          .channel figure {
            margin: 0;
            position: relative;
            overflow: hidden;
          }
          .channel img {
            width: 100%;
          }
          .channel figcaption {
            box-shadow: 0 -20px 40px rgba(0, 0, 0, 0.65) inset;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            bottom: 0;
            color: #fff;
            font-size: 0.9em;
            margin: 0;
            padding: 0.5em;
            width: 100%;
            z-index: 2;
          }
          .channel:hover {
            opacity: 0.9;
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
        `}</style>
      </>
    );
  }
}
