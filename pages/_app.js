import '../styles/globals.css';
import Head from 'next/head';

function MyApp({Component, pageProps: { session, ...pageProps },}) {
  return (
    <>
      <Head>
        <title>IssueTrack</title>
        <meta name="description" content="Issue tracking website to help teams/individuals log and assign bugs to be fixed." />

        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" property='og:description' content="Issue tracking website to help teams/individuals log and assign bugs to be fixed." />
        <meta name="author" content="Matthew Harvey" />
        <meta name="Keywords" content="IssueTrack" />

        <meta property='og:title' content='IssueTrack'/>
        <meta property='og:title' name="title"  content='IssueTrack'/>
        <meta property='og:type' content="Website" />
        <meta property='og:image' name="image" content='/vercel.svg'/>
        <meta property='og:url' content='/vercel.svg'/>

        <meta name="twitter:title" content="IssueTrack" />
        <meta name="twitter:image" content="/vercel.svg" />
        <meta name="twitter:card" content="/vercel.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp