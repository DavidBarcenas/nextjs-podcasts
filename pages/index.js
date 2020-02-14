import React, { Component } from "react";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
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
      <Layout title="Podcasts">
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}
