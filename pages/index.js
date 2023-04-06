import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Router from 'next/router'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const godiste = document.getElementById("godiste").value;
    const trenutniVrtic = document.getElementById("trenutniVrtic").value;
    const zeljeniVrticiSelectedOptions = document.getElementById("zeljeniVrtici").selectedOptions;
    const zeljeniVrtici = Array.from(zeljeniVrticiSelectedOptions).map(({value}) => value);
    const email = document.getElementById("email").value;
    
    const res = await fetch("/api/insert", {
      method: "POST",
      body: JSON.stringify({
        year: godiste,
        email,
        current: trenutniVrtic,
        wanted: zeljeniVrtici.join(","),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (res.status == 201) {
      Router.push(`/rezultati?email=${email}`)
   }
  }

  return (
    <>
      <Head>
        <title>Radosno detinjstvo - razmena vrtica</title>
        <meta name="description" content="Razmena vrtica u Radosnom Detinjstvu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <nav>
        <Link href='/'>Unos</Link>
        <Link href='/rezultati'>Rezultati</Link>
      </nav>


      <h1>Radosno detinjstvo - razmena vrtica</h1>

      <p>Unesite podatke o detetu samo jednom, posle na stranici <Link href='/rezultati'>Rezultati</Link> mozete da vidite da li ima parova za rotiranje.</p>
      <br/>
      <br/>

      <form
        id="form"
        // action="/api/hello"
        onSubmit={onSubmit}
        // method="post"
      >
        <div id="mainGrid">
          <h3>Dete od septembra ide u grupu</h3>
          <select id="godiste" required>
                <option value="2022">mladja jaslena</option>
                <option value="2021">starija jaslena</option>
                <option value="2020">mladja</option>
                <option value="2019">srednja</option>
                <option value="2018">starija</option>
                <option value="2017">najstarija</option>
            </select>

          <h3>Trenutno ide u vrtic</h3>
          <select id="trenutniVrtic" required>
                <option value="Палчица">Бранимира Ћосића 40 - Палчица</option>
                <option value="Чуперак">Саве Ковачевића 7 - Чуперак </option>
                <option value="Звончица">Саве Ковачевића 14 - Звончица</option>
                <option value="Венди">Браће Дроњак бб - Венди</option>
                <option value="Златна рибица">Мародићева 4а - Златна рибица</option>

                <option value="Зека">Будисава, Вука Караџића бб - Зека</option>
                <option value="Невен">Ковиљ, Војвођанских бригада 14 - Невен</option>
                <option value="Звончић">Каћ, Саве Малешева б.б. - Звончић</option>
                <option value="Колибри">Булевар Јаше Томића 3 - Колибри</option>
                <option value="Бамби">Карађорђева 55 - Бамби</option>
                <option value="Вртић Срна">Радоја Домановића 24 - Вртић Срна</option>
                <option value="Детелина са 4 листа">Калмана Ланга 2 - Детелина са 4 листа</option>

                <option value="Пинокио">Бегеч, Краља Петра l, 45 - Пинокио</option>
                <option value="Шврћа">Јернеја Копитара 1 - Шврћа</option>
                <option value="Лане">Хероја Пинкија 25 - Лане</option>
                <option value="Црвенкапа">Футог III, Пролетерска 2 - Црвенкапа</option>
                <option value="Биберче">Футог IV, Вој. Мишића бб - Биберче</option>
                <option value="Радосница">Адице, С. Шолаје бб - Радосница</option>
                <option value="Дунавски цвет">Ћирила и Методија 69 - Дунавски цвет</option>


                <option value="Коцкица">Карловачких ђака 31а Сремски Карловци - Коцкица</option>
                <option value="Чигра">Јоже Влаховића, бб - Чигра</option>
                <option value="Цврчак">Палмотићева 1 - Цврчак</option>
                <option value="Зека">Буковац, Видовданска 8 - Зека</option>
                <option value="Чика Jова">Сремска Каменица, Змајевац 2 - Чика Jова</option>
                <option value="Змај">Сремска Каменица II, Бул. 23. Октобра 2 - Змај</option>
                <option value="Плави чуперак">Сремска Каменица III, С. Милетића бб - Плави чуперак</option>
                <option value="Изворчић">Стари Лединци, В. Караџића 63 - Изворчић</option>
                <option value="Чаробњак">Нови Лединци, Ђурђевданска 1 - Чаробњак</option>

                <option value="Бубамара">Ченејска 50 - Бубамара</option>
                <option value="Чаробни брег">Чаробни брег - Клисански пут 165</option>
                <option value="Видовдански звончић">Видовданско насеље - Видовдански звончић</option>
                <option value="Ласта">Ченеј, Партизанска 2 - Ласта</option>
                <option value="Крцко орашчић">Орахова - Крцко орашчић</option>
                <option value="Дуга">Шангај, VIII улица бр. 6 - Дуга</option>
                <option value="Веверица">Висарионова 4а - Веверица</option>
                <option value="Ђурђевак">Београдски кеј 37 - Ђурђевак</option>
                <option value="Плави зец">Милетићева 22 - Плави зец</option>
                <option value="Сигридруг">Алмашка 24 - Сигридруг</option>


                <option value="Различак">Народног Фронта 45 - Различак</option>
                <option value="Сунцокрет">Алексе Шантића 32 - Сунцокрет</option>
                <option value="Полетарац">Пушкинова 19 - Полетарац</option>
                <option value="Златокоса">Ветерник, Краља Александра, 62 - Златокоса</option>
                <option value="Рода">Ветерник, Паунова - Рода</option>
                <option value="Камичак">Ветерник, Милана Тепића - Камичак</option>
                <option value="Новосађанче">Бановић Страхиње бб - Новосађанче</option>


                <option value="Звездани гај">Степановићево - Звездани гај</option>
                <option value="Лиенка">Кисач, Јана Амоса Коменског - Лиенка</option>
                <option value="Весели патуљци">Руменка, П. Шандора 25 - Весели патуљци</option>
                <option value="Плава Звезда">Сајлово 37 - Плава Звезда</option>
                <option value="Петар Пан">Јанка Чмелика 87 - Петар Пан</option>
                <option value="Цврчак и мрав">Трг Мајке Јевросиме 2 - Цврчак и мрав</option>


                <option value="Калимеро">Драгише Брашована 16 - Калимеро</option>
                <option value="Мрвица">Јиречекова 9 - Мрвица</option>
                <option value="Весели вртић">Др Илије Ђуричића 2 - Весели вртић</option>
                <option value="Чаролија">Соње Маринковић 1 - Чаролија</option>
                <option value="Весељко">Трг Коменског 9 - Весељко</option>
                <option value="Маслачак">Народног фронта 42 - Маслачак</option>



                <option value="Свитац">Стојана Новаковића бб - Свитац</option>
                <option value="Гуливер">Бате Бркића 1а - Гуливер</option>
                <option value="Бистричак I">Сељачких Буна 63 - Бистричак I</option>
                <option value="Бистричак II">Сељачких Буна 65 - Бистричак II</option>
                <option value="Звездан">Сељачких Буна 51 - Звездан</option>
                <option value="Бајка">Стевана Христића 15 - Бајка</option>
                <option value="Весели возић">Јанка Чмелика 110 - Весели возић</option>

                <option value="Вилењак">Радничка 20 - Вилењак</option>
                <option value="Меда">Радничка 47 - Меда</option>
                <option value="Златна греда">Златне Греде 6 - Златна греда</option>
                <option value="Вила">Војвођанских Бригада 14 - Вила</option>
                <option value="Пчелица">Лазе Костића 5 - Пчелица</option>
                <option value="Бубица">Пап Павла 9 - Бубица</option>
                <option value="Панда">Николе Тесле 4 - Панда</option>
                <option value="Лептирић">Браће Кркљуш 15 - Лептирић</option>
                <option value="Сунце">Гагаринова 10 - Сунце</option>
                <option value="Споменак">Антона Урбана 2 - Споменак</option>
                <option value="Пужић">Вршачка 23 - Пужић</option>
                
          </select>

          <div>
            <h3>Zelimo da promenimo za vrtic</h3>
            <p>Ukoliko ste za racunarom,<br/>drzite CTRL dugme na tastaturi za biranje vise vrtica</p>
          </div>
          <select id="zeljeniVrtici" multiple required>
                <option value="Палчица">Бранимира Ћосића 40 - Палчица</option>
                <option value="Чуперак">Саве Ковачевића 7 - Чуперак </option>
                <option value="Звончица">Саве Ковачевића 14 - Звончица</option>
                <option value="Венди">Браће Дроњак бб - Венди</option>
                <option value="Златна рибица">Мародићева 4а - Златна рибица</option>

                <option value="Зека">Будисава, Вука Караџића бб - Зека</option>
                <option value="Невен">Ковиљ, Војвођанских бригада 14 - Невен</option>
                <option value="Звончић">Каћ, Саве Малешева б.б. - Звончић</option>
                <option value="Колибри">Булевар Јаше Томића 3 - Колибри</option>
                <option value="Бамби">Карађорђева 55 - Бамби</option>
                <option value="Вртић Срна">Радоја Домановића 24 - Вртић Срна</option>
                <option value="Детелина са 4 листа">Калмана Ланга 2 - Детелина са 4 листа</option>

                <option value="Пинокио">Бегеч, Краља Петра l, 45 - Пинокио</option>
                <option value="Шврћа">Јернеја Копитара 1 - Шврћа</option>
                <option value="Лане">Хероја Пинкија 25 - Лане</option>
                <option value="Црвенкапа">Футог III, Пролетерска 2 - Црвенкапа</option>
                <option value="Биберче">Футог IV, Вој. Мишића бб - Биберче</option>
                <option value="Радосница">Адице, С. Шолаје бб - Радосница</option>
                <option value="Дунавски цвет">Ћирила и Методија 69 - Дунавски цвет</option>


                <option value="Коцкица">Карловачких ђака 31а Сремски Карловци - Коцкица</option>
                <option value="Чигра">Јоже Влаховића, бб - Чигра</option>
                <option value="Цврчак">Палмотићева 1 - Цврчак</option>
                <option value="Зека">Буковац, Видовданска 8 - Зека</option>
                <option value="Чика Jова">Сремска Каменица, Змајевац 2 - Чика Jова</option>
                <option value="Змај">Сремска Каменица II, Бул. 23. Октобра 2 - Змај</option>
                <option value="Плави чуперак">Сремска Каменица III, С. Милетића бб - Плави чуперак</option>
                <option value="Изворчић">Стари Лединци, В. Караџића 63 - Изворчић</option>
                <option value="Чаробњак">Нови Лединци, Ђурђевданска 1 - Чаробњак</option>

                <option value="Бубамара">Ченејска 50 - Бубамара</option>
                <option value="Чаробни брег">Чаробни брег - Клисански пут 165</option>
                <option value="Видовдански звончић">Видовданско насеље - Видовдански звончић</option>
                <option value="Ласта">Ченеј, Партизанска 2 - Ласта</option>
                <option value="Крцко орашчић">Орахова - Крцко орашчић</option>
                <option value="Дуга">Шангај, VIII улица бр. 6 - Дуга</option>
                <option value="Веверица">Висарионова 4а - Веверица</option>
                <option value="Ђурђевак">Београдски кеј 37 - Ђурђевак</option>
                <option value="Плави зец">Милетићева 22 - Плави зец</option>
                <option value="Сигридруг">Алмашка 24 - Сигридруг</option>


                <option value="Различак">Народног Фронта 45 - Различак</option>
                <option value="Сунцокрет">Алексе Шантића 32 - Сунцокрет</option>
                <option value="Полетарац">Пушкинова 19 - Полетарац</option>
                <option value="Златокоса">Ветерник, Краља Александра, 62 - Златокоса</option>
                <option value="Рода">Ветерник, Паунова - Рода</option>
                <option value="Камичак">Ветерник, Милана Тепића - Камичак</option>
                <option value="Новосађанче">Бановић Страхиње бб - Новосађанче</option>


                <option value="Звездани гај">Степановићево - Звездани гај</option>
                <option value="Лиенка">Кисач, Јана Амоса Коменског - Лиенка</option>
                <option value="Весели патуљци">Руменка, П. Шандора 25 - Весели патуљци</option>
                <option value="Плава Звезда">Сајлово 37 - Плава Звезда</option>
                <option value="Петар Пан">Јанка Чмелика 87 - Петар Пан</option>
                <option value="Цврчак и мрав">Трг Мајке Јевросиме 2 - Цврчак и мрав</option>


                <option value="Калимеро">Драгише Брашована 16 - Калимеро</option>
                <option value="Мрвица">Јиречекова 9 - Мрвица</option>
                <option value="Весели вртић">Др Илије Ђуричића 2 - Весели вртић</option>
                <option value="Чаролија">Соње Маринковић 1 - Чаролија</option>
                <option value="Весељко">Трг Коменског 9 - Весељко</option>
                <option value="Маслачак">Народног фронта 42 - Маслачак</option>



                <option value="Свитац">Стојана Новаковића бб - Свитац</option>
                <option value="Гуливер">Бате Бркића 1а - Гуливер</option>
                <option value="Бистричак I">Сељачких Буна 63 - Бистричак I</option>
                <option value="Бистричак II">Сељачких Буна 65 - Бистричак II</option>
                <option value="Звездан">Сељачких Буна 51 - Звездан</option>
                <option value="Бајка">Стевана Христића 15 - Бајка</option>
                <option value="Весели возић">Јанка Чмелика 110 - Весели возић</option>

                <option value="Вилењак">Радничка 20 - Вилењак</option>
                <option value="Меда">Радничка 47 - Меда</option>
                <option value="Златна греда">Златне Греде 6 - Златна греда</option>
                <option value="Вила">Војвођанских Бригада 14 - Вила</option>
                <option value="Пчелица">Лазе Костића 5 - Пчелица</option>
                <option value="Бубица">Пап Павла 9 - Бубица</option>
                <option value="Панда">Николе Тесле 4 - Панда</option>
                <option value="Лептирић">Браће Кркљуш 15 - Лептирић</option>
                <option value="Сунце">Гагаринова 10 - Сунце</option>
                <option value="Споменак">Антона Урбана 2 - Споменак</option>
                <option value="Пужић">Вршачка 23 - Пужић</option>
                
          </select>

          <h3 className="gridSpanTwoCells">Email</h3>
          <input 
          required
          // className="gridSpanTwoCells"
          type="text"
          id="email"/>

          

        </div>

        <input type="submit" className="submitButton"/>
        </form>

      </main>
    </>
  )
}
