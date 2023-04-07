import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState(router.query?.email ?? "");
  const [result, setResult] = useState([]);

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
    if (!result || result.length === 0) {
      setResult(null);
    } else {
      setResult(result);
    }
  }


  return (
    <>
      <Head>
        <title>Radosno detinjstvo - razmena vrtića - rezultati</title>
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
        <div>
          <h1>Razmena vrtića</h1>
          <div style={{ maxWidth: "500px" }} >
            <ul>
              <li>Unesite mail kojim ste se prijavili i ukoliko postoji izvodljiva rotacija da dobijete zeljeni vrtić bice vam prikazana.</li>
              <li>Ako ste dobili rotaciju kojom biste mogli da dobijete zeljeni vrtić bice vam prikazani email-ovi od osoba koje treba da ucestvuju u razmeni, pa ih mozete kontaktirati.</li>
              <li>Ako ste prolašli željeni vrtić, molim vas da odete na stranicu <Link href='/brisanje'>Brisanje</Link> i unesete vas email kako ne biste vise ulazili u rotaciju.</li>
              <li>Srecno!</li>
            </ul>
          </div>

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
                required
              />
              <input type={"submit"} value="Prikazi rezultate" />
            </div>
          </form>
          <div>

            <br />
            <h3>Parovi za menjanje</h3>
            {
              result !== null ?
                result.map((firstPerson, index) => {
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
                <div>Nema parova za menjanje, proverite kasnije</div>
            }
          </div>
        </div>
      </main >
    </>
  );
}

