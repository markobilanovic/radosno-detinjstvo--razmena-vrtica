import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient';

export default function Home({ pairs }) {

  console.log(pairs);

  return (
    <>
      <Head>
        <title>Radosno detinjstvo - razmena vrtića</title>
        <meta name="description" content="Razmena vrtića u Radosnom Detinjstvu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <nav>
          <Link href='/'>Unos</Link>
          <Link href='/rezultati'>Rezultati</Link>
          <Link href='/liste'>Liste</Link>
          <Link href='/brisanje'>Brisanje</Link>
        </nav>


        <h1>Razmena vrtića</h1>
        <h2>Lista svih zelja</h2>

      </main>
    </>
  )
}

export async function getServerSideProps(context) {

  const { data, error } = await supabase.from('persons').select();

  const pairs = [];
  data.forEach(async (person) => {
    // const data = {
    //     email: person.email,
    //   }
    const JSONdata = JSON.stringify({});
    const endpoint = 'http://localhost:3000/api/checkAll'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result || result.length === 0) {
      // setResult(null);
    } else {
      console.log("HIT", person.email, result);
      pairs.push(result);
    }
  });

  return {
    props: { pairs }, // will be passed to the page component as props
  }
}