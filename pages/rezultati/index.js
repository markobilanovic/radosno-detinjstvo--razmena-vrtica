import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState(router.query?.email ?? "");
  const [result, setResult] = useState([]);

  console.log(router.query);
  useEffect(() => {
    if (router.query?.email) {
      getMatches(router.query?.email)
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    getMatches(e.target.email.value)
  }

  const getMatches = async (email) => {
    const data = {
      email,
    }
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/check'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options);
    const result = await response.json();
    setResult(result ?? []);
  }


  return (
      <>
        <Head>
          <title>Radosno detinjstvo - razmena vrtica - rezultati</title>
          <meta name="description" content="Razmena vrtica u Radosnom Detinjstvu" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
        <nav>
          <a href='/'>Unos</a>
          <a href='/rezultati'>Rezultati</a>
        </nav>
          <div>
            <h1>Radosno detinjstvo - razmena vrtica</h1>

            <form
            method="post"
            onSubmit={onSubmit}
            >
              <div className={"flex-row"}>
                <h3>Email</h3>
                <input type={"text"}
                name={"email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                />
                <input type={"submit"} value="Prikazi rezultate"/>
              </div>
            </form>
            <div>

              <br/>
              <h3>Parovi za menjanje</h3>
              {
                result.length > 1 ?
                result.map((firstPerson, index) => {
                  console.log(firstPerson);
                  let secondPerson;
                  if (index + 1 === result.length) {
                    secondPerson = result[0];
                  } else {
                    secondPerson = result[index + 1];
                  }
                  return <div key={firstPerson.email}>
                    {firstPerson.current}: {firstPerson.email} ➡ {secondPerson.email}
                  </div>
                })
                :
                null
              }
            </div>

          </div>
        </main>
      </>
  );
}

