import React, { Component } from "react";
import Link from "next/link";

export default class ChannelGrid extends Component {
  render() {
    const { channels } = this.props;
    return (
      <>
        <div className="channels">
          {channels.map(channel => (
            <Link href={`/channel?id=${channel.id}`} key={channel.id}>
              <a className="channel">
                <figure>
                  <img
                    src={channel.urls.logo_image.original}
                    alt={channel.title}
                  />
                  <figcaption>{channel.title}</figcaption>
                </figure>
              </a>
            </Link>
          ))}
        </div>

        <style jsx>{`
          .channels {
            display: grid;
            grid-gap: 5px 10px;
            padding: 10px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          .channel {
            display: block;
            border-radius: 3px;
            margin-bottom: 0.5em;
          }
          .channel figure {
            margin: 0;
            position: relative;
            overflow: hidden;
          }
          .channel img {
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
            width: 100%;
          }
          .channel figcaption {
            color: #292929;
            font-size: 0.9em;
            font-weight: bold;
            margin: 0;
            padding: 0.5em 0;
          }
          .channel:hover {
            opacity: 0.9;
          }
        `}</style>
      </>
    );
  }
}
