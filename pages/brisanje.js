import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Link from 'next/link'

export default function Home() {

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
          }
          const JSONdata = JSON.stringify(data);
          const endpoint = '/api/delete'
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSONdata,
          }
          const response = await fetch(endpoint, options);
        //   const result = await response.json();
          if (response.status == 200) {
            window.alert("Uspesno ste izbrisani iz sistema. Hvala.");
          }
      }

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
                <h2>Brisanje</h2>

                <form
                    method="post"
                    onSubmit={onSubmit}
                >
                    <div className={"flex-row"}>
                        <h3>Email</h3>
                        <input type={"text"}
                            name={"email"}
                            // value={email}
                            // onChange={(e) => {
                            //     setEmail(e.target.value);
                            // }}
                            required
                        />
                        <input type={"submit"} value="Obrisi me" />
                    </div>
                </form>

            </main>
        </>
    )
}