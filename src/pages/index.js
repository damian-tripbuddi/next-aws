import { useEffect, useState } from 'react';
import Head from 'next/head';

import Amplify from '@aws-amplify/core';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Task } from '../models';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const fetchTasks = await DataStore.query(Task);
      setTasks(fetchTasks);
    };
    fetch();
  }, []);

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <button
          onClick={async () => {
            await DataStore.save(
              new Task({
                title: `My First Task`,
                description: 'Task Description',
                status: 'Status',
              })
            );
          }}>
          Save
        </button>
        <div>
          <pre>{JSON.stringify(tasks, null, 4)}</pre>
        </div>
      </main>

      <footer>
        <a href='https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app' target='_blank' rel='noopener noreferrer'>
          Powered by <img src='/zeit.svg' alt='ZEIT Logo' />
        </a>
      </footer>
    </div>
  );
}
