import React, { Component } from "react";
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
        {channels.map(channel => (
          <p key={channel.id}>{channel.title}</p>
        ))}

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
