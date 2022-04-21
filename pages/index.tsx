import type { NextPage } from 'next';
import Home from './home';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const App: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, []);

  return <Home />;
};

export default App;
