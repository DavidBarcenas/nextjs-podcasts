import Link from "next/link";
import Layout from "../components/Layout";

function Error({ statusCode }) {
  return (
    <Layout title="Ups! parece que algo salió mal...">
      {statusCode === 404 ? (
        <div className="message">
          <h2>Esta página no existe</h2>
          <Link href="/">
            <a>Ir al inicio</a>
          </Link>
        </div>
      ) : (
        <div className="message">
          <h2>Hubo un problema</h2>
          <p>Intenta nuevamente en unos segundos</p>
        </div>
      )}

      <style jsx>{`
        .message {
          display: flex;
          align-content: center;
          flex-wrap: wrap;
          justify-content: center;
          height: calc(100vh - 50px);
          text-align: center;
        }

        .message h2 {
          color: #8756ca;
          width: 100%;
        }
      `}</style>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
