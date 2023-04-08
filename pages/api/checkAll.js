// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from '../../lib/supabaseClient';

async function getAll() {
  const { data, error } = await supabase
    .from('persons')
    .select();

  data.sort((a, b) => a.priority > b.priority ? -1 : 1);

  return data;
}

export default async function handler(req, res) {
  const allData = await getAll();
  const results = [];
  allData.forEach((person) => {
    person.wanted = person.wanted.split(",");
  });
  allData.forEach((person) => {
    console.log("********************************************");
    console.log(`${person.email}   |  ${person.current}   | ${person.wanted}`);
    // console.log(`Ima: `);
    // console.log(`Trazi: ${person.wanted}`);
    const potentialPersons = allData.filter((x) => x.year === person.year && x.email !== person.email);
    // potentialPersons.forEach((x) => x.wanted = x.wanted.split(","));
    const result = checkIfSomebodyHasWantedKindergarden(potentialPersons, person, [person]);
    if (result) {
      results.push(result);
    }
  });

  res.status(200).json(results);
}

function checkIfSomebodyHasWantedKindergarden(potentialPersons, person, traders) {
  let final;

  const hit = potentialPersons.some((otherPerson) => {
    if (otherPerson.wanted.some((w) => w === person.current)) {
      const tradersCopy = traders.slice();
      tradersCopy.push(otherPerson);
      if (person.wanted.some((w) => w === otherPerson.current)) {
        final = tradersCopy;
        return true;
      } else {
        const hybridPerson = {
          godiste: person.godiste,
          email: person.email,
          current: otherPerson.current,
          wanted: person.wanted,
        };
        console.log(`${otherPerson.email}   |  ${otherPerson.current}   | ${otherPerson.wanted}`);
        // console.log(`${otherPerson.email} ➡ Ima: ${person.current} ➡ Trazi: ${person.wanted}`);
        // console.log(hybridPerson.current);
        const potentialPersonsCopy = potentialPersons.filter((p) => p.email !== otherPerson.email);
        const tradersPath = checkIfSomebodyHasWantedKindergarden(potentialPersonsCopy, hybridPerson, tradersCopy);
        if (tradersPath) {
          final = tradersPath;
          return true;
        } else {
          return false;
        }
      }
    }
  });

  if (hit) {
    return final;
  } else {
    return null;
  }
}
