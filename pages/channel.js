import React, { Component } from "react";
import Error from "./_error";
import AudioList from "../components/AudioList";
import ChannelList from "../components/ChannelList";
import Layout from "../components/Layout";

export default class channel extends Component {
  static async getInitialProps({ query, res }) {
    let idChannel = query.id;

    try {
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
      console.log(reqChannel.status);
      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status;
        return {
          channel: null,
          audioClips: null,
          childChannels: null,
          statusCode: reqChannel.status
        };
      }
      return { channel, audioClips, childChannels, statusCode: 200 };
    } catch (e) {
      return {
        channel: null,
        audioClips: null,
        childChannels: null,
        statusCode: 503
      };
    }
  }
  render() {
    const { channel, audioClips, childChannels, statusCode } = this.props;
    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />;
    }
    return (
      <Layout title={channel.title}>
        <figure className="channel_header">
          <div
            className="layer_blur"
            style={{
              backgroundImage: `url(${channel.urls.logo_image.original})`
            }}
          ></div>
          <img src={channel.urls.logo_image.original} alt={channel.title} />
          <figcaption>{channel.description}</figcaption>
        </figure>

        {audioClips.length > 0 && <AudioList audioClips={audioClips} />}
        {childChannels.length > 0 && (
          <ChannelList childChannels={childChannels} />
        )}

        <style jsx>{`
          .channel_header {
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
        `}</style>
      </Layout>
    );
  }
}
