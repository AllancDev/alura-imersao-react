import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuisAllPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen externalDb={externalDb} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    const [projectName, githubUser] = context.query.id.split('___');
    const externalDb = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`,
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Falha em recuperar dados.');
      })
      .then((data) => data)
      .catch((err) => {
        console.error(err);
      });

    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    throw new Error('Error');
  }
}
