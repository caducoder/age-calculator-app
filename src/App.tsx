import dayjs from 'dayjs';
import pt from 'dayjs/locale/pt';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import IconArrow from './assets/images/icon-arrow.svg';
import Form from './components/Form';
import TextInput from './components/TextInput';

import './App.scss';

dayjs.extend(customParseFormat);
dayjs.extend(isLeapYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale(pt);


function isValidDate(date: string) {
  return dayjs(date).isValid();
}

function App() {
  const [timeAlive, setTimeAlive] = useState({
    year: "--",
    month: "--",
    day: "--"
  });
  const [errorMsg, setErrorMsg] = useState({
    year: "",
    month: "",
    day: ""
  });

  const handleSubmitButtonClick = async (data: FormData) => {
    const values = {
      day: +data.get('day')!,
      month: +data.get('month')!,
      year: +data.get('year')!
    };

    const dateString = `${values.year}-0${values.month}-${values.day}`;
    const isDateValid = isValidDate(dateString);

    const date = dayjs(dateString);
    const isBefore = date.year() < dayjs().year();

    const isLeapYear = dayjs(date).isLeapYear();

    setErrorMsg({
      year: isBefore ? 'Must be in the past' : '',
      month: values.month > 12 ? 'Must be a valid month' : '',
      day: values.day > 31 || ((isLeapYear && values.month == 2) && values.day > 28) ? 'Must be a valid day' : ''
    });

    if (isDateValid && isBefore) {
      const diferenca = dayjs().diff(date);

      const anos = Math.floor(diferenca / (365 * 24 * 60 * 60 * 1000));
      const meses = Math.floor((diferenca % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
      const dias = Math.floor((diferenca % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));

      setTimeAlive({
        day: dias.toString(),
        month: meses.toString(),
        year: anos.toString()
      });
    } else {
      setTimeAlive({
        year: "--",
        month: "--",
        day: "--"
      });
    }

  };

  return (
    <>
      <main className='main-box'>
        <Form className='form' id='form' onSubmit={handleSubmitButtonClick}>
          <TextInput
            label='Day'
            id='day'
            name='day'
            placeholder='DD'
            type='number'
            required
            min={1}
            errorText={errorMsg.day}
          />

          <TextInput
            label='Month'
            id='month'
            name='month'
            placeholder='MM'
            type='number'
            required
            max={12}
            min={1}
            errorText={errorMsg.month}
          />

          <TextInput
            label='Year'
            id='year'
            name='year'
            placeholder='YYYY'
            type='number'
            required
            max={new Date().getFullYear()}
            min={0}
            errorText={errorMsg.year}
          />
        </Form>
        <div className='separator'>
          <button
            form='form'
            type="submit"
            className='submit-button'
          >
            <img src={IconArrow} alt="Seta para baixo" />
          </button>
          <span className='line-through'></span>
        </div>
        <section className='result-section'>
          <p><span>{timeAlive.year}</span> years</p>
          <p><span>{timeAlive.month}</span> months</p>
          <p><span>{timeAlive.day}</span> days</p>
        </section>
      </main>
    </>
  );
}

export default App;
