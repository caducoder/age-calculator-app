import { useState } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import pt from 'dayjs/locale/pt'
import dayjs from 'dayjs';
import IconArrow from './assets/images/icon-arrow.svg'
import './App.scss'

dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale(pt)

function App() {
  const [birthDate, setBirthDate] = useState({
    year: "",
    month: "",
    day: ""
  });
  const [timeAlive, setTimeAlive] = useState({
    year: "--",
    month: "--",
    day: "--"
  })


  const handleButtonClick = (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    const date = dayjs(`${birthDate.year}-${birthDate.month}-${birthDate.day}`)
    const valid = date.isSameOrBefore(dayjs()) && dayjs(date, 'YYYY-MM-DD', true).isValid()
    // console.log(valid)
    if (valid) {
      const diferenca = dayjs().diff(date);
      console.log("Diff: ", diferenca)
      const anos = Math.floor(diferenca / (365 * 24 * 60 * 60 * 1000));
      const meses = Math.floor((diferenca % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
      const dias = Math.floor((diferenca % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

      console.log(`Anos: ${anos}, Meses: ${meses}, Dias: ${dias}`)
      setTimeAlive({
        day: dias.toString(),
        month: meses.toString(),
        year: anos.toString()
      })
    } else {
      setTimeAlive({
        year: "--",
        month: "--",
        day: "--"
      })
    }

  }

  return (
    <>
      <main className='main-box'>
        <form className='form-inputs' id='form' onSubmit={handleButtonClick}>
          <div >
            <label htmlFor='day' className=''>Dia</label>
            <input
              type="number"
              placeholder='DD'
              name="day"
              id="day"
              value={birthDate.day}
              onChange={(ev) => setBirthDate(prev => ({ ...prev, day: ev.target.value }))}
              required
            />
          </div>
          <div>
            <label htmlFor='month'>Mês</label>
            <input
              type="number"
              placeholder='MM'
              name="month"
              id="month"
              value={birthDate.month}
              onChange={(ev) => setBirthDate(prev => ({ ...prev, month: ev.target.value }))}
              required
            />
          </div>
          <div>
            <label htmlFor='year'>Ano</label>
            <input
              type="number"
              placeholder='YYYY'
              name="year"
              id="year"
              value={birthDate.year}
              onChange={(ev) => setBirthDate(prev => ({ ...prev, year: ev.target.value }))}
              required
            />
          </div>
        </form>
        <div className='separator'>
          <button
            form='form'
            type="submit"
            className='submit-button'
          >
            <img src={IconArrow} alt="Seta para baixo" />
          </button>
          <span></span>
        </div>
        <section className='result-section'>
          <p><span>{timeAlive.year}</span> anos</p>
          <p><span>{timeAlive.month}</span> meses</p>
          <p><span>{timeAlive.day}</span> dias</p>
        </section>
      </main>
    </>
  )
}

export default App
