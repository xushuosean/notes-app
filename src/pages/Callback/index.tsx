import { useSearchParams } from '@umijs/max';
import { useEffect } from 'react';

const Callback = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get('code'), 'ddd');

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    console.log(code);
  }, [searchParams]);

  return <div>Please Watting...</div>;
};

export default Callback;
