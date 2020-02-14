import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";

export default class Layout extends Component {
  render() {
    const { children, title } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          ></meta>
        </Head>
        <header>
          <Link href="/">
            <a>{title}</a>
          </Link>
        </header>

        {children}

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            font-weight: bold;
            padding: 15px;
            text-align: center;
          }

          header a {
            color: #fff;
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
      </div>
    );
  }
}
