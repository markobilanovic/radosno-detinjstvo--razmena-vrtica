import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient';

export default function Home({ persons }) {
    const [godiste, setGodiste] = useState("");
    const [filteredPersons, setFilteredPersons] = useState([]);

    useEffect(() => {
        if (godiste) {
            const filtered = persons.filter((person) => person.year === godiste);
            setFilteredPersons(filtered);
        } else {
            setFilteredPersons(persons);
        }
    }, [godiste]);

    return (
        <>
            <Head>
                <title>Radosno detinjstvo - razmena vrtića</title>
                <meta name="description" content="Razmena vrtića u Radosnom Detinjstvu" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
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

                <div style={{display: "flex", gap: "1rem", marginTop: "2rem", marginBottom: "2rem" }}>
                    Filtriraj po grupi:
                    <select value={godiste} onChange={(e) => setGodiste(e.target.value)}>
                        <option value="">Svi uzrasti</option>
                        <option value="2022">mladja jaslena</option>
                        <option value="2021">starija jaslena</option>
                        <option value="2020">mladja</option>
                        <option value="2019">srednja</option>
                        <option value="2018">starija</option>
                        <option value="2017">najstarija</option>
                    </select>
                </div>
                <div style={{overflowX: "auto"}}>
                <table>
                    <thead>
                        <tr>
                            <th>R. Br.</th>
                            <th>Email</th>
                            <th>Trenutni</th>
                            <th>Zeljeni</th>
                            <th>Grupa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredPersons.map((person, index) => {
                                return <tr key={person.email + index}>
                                    <td>{index + 1}</td>
                                    <td>{person.email}</td>
                                    <td>{person.current}</td>
                                    <td>{person.wanted}</td>
                                    <td>
                                        <select value={person.year} disabled>
                                            <option value="2022">mladja jaslena</option>
                                            <option value="2021">starija jaslena</option>
                                            <option value="2020">mladja</option>
                                            <option value="2019">srednja</option>
                                            <option value="2018">starija</option>
                                            <option value="2017">najstarija</option>
                                        </select>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {

    const { data, error } = await supabase.from('persons').select();

    let persons = data.map((person) => {
        let formatedEmail;
        const emailParts = person.email.split("@");
        if (emailParts.length !== 2) {
            formatedEmail = person.email;
        } else {
            formatedEmail = emailParts[0][0] + emailParts[0][1] + "...@" + emailParts[1];
        }

        return {
            email: formatedEmail,
            current: person.current,
            wanted: person.wanted,
            year: person.year,
            priority: person.priority,
        }
    });

    persons.sort((a, b) => a.priority > b.priority ? -1 : 1);

    return {
        props: { persons }, // will be passed to the page component as props
    }
}