import React, { Component } from "react";
import Link from "next/link";

export default class ChannelList extends Component {
  render() {
    const { childChannels } = this.props;
    return (
      <div className="channel_wrapper">
        <h3>Relacionados</h3>
        <div className="child_grid">
          {childChannels.map(child => (
            <Link href={`/channel?id=${child.id}`} key={child.id}>
              <a>
                <img src={child.urls.logo_image.original} alt={child.title} />
                {child.title}
              </a>
            </Link>
          ))}
        </div>

        <style jsx>{`
          .channel_wrapper {
            padding: 0 10px;
          }
          .channel_wrapper h3 {
            color: #8756ca;
          }
          .child_grid {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }

          .child_grid img {
            max-width: 100%;
          }

          .child_grid a {
            font-size: 0.9em;
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  }
}
