import { useState } from 'react';
import { Logo } from '../components/icon/icons';
import { Link, useNavigate } from 'react-router';
import { InputText } from '../components/form/InputText';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { routeDef } from '../utils/routes';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState<'oauth' | 'email' | false>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showSplash, setShowSplash] = useState(false);
  const [userData, setUserData] = useState();

  async function onGoogleLoginSuccess(credentialResponse: CredentialResponse) {
    setLoading('oauth');
    setErrors([]);

    // set token to auth header: bearer <token>
    // const res = await postOAuth(response);
    // if (!res) {
    //   setErrors(['Something went wrong!']);
    //   setOAuthLoading(false);
    //   return;
    // }

    // const userRes = await res.json();
    // userRes._refreshCheck = Date.now() + 60 * 60 * 1000;

    // const userData = { ...userRes };
    // if (userData.email === 'marieta.avramova@gmail.com') {
    //   userData.givenName = 'Panda';
    // }

    setShowSplash(true);
    // setUserData(userData);

    // const { user } = useUserState();
    // user.value = userRes;

    // db.users.put(userRes);

    setLoading(false);

    await new Promise<void>((res) => {
      setTimeout(res, 3000);
    });

    navigate(routeDef.timeline.url);
  }

  // todo: handle an error event
  function onGoogleLoginError() {
    console.error('Login failed');
  }

  async function onEmailLogin() {
    setLoading('email');
    setErrors([]);
    // const response = await postLogin(fields);

    // if (!response) {
    //   setErrors(['Incorrect email or password']);
    //   setLoading(false);
    //   return;
    // }

    // const userRes = await response.json();
    // userRes._refreshCheck = Date.now() + 60 * 60 * 1000;

    setShowSplash(true);
    // setUserData(userRes);

    // const { user } = useUserState();
    // user.value = userRes;

    // db.users.put(userRes);

    setLoading(false);

    await new Promise<void>((res) => {
      setTimeout(res, 3000);
    });

    navigate(routeDef.timeline.url);
  }

  return (
    <div className='relative flex h-screen w-screen items-center'>
      <div className='flex h-screen flex-1 flex-col items-center justify-center'>
        <div className='mt-0 mb-12 flex flex-col overflow-hidden rounded-sm drop-shadow-sm'>
          <div className='flex h-48 w-48 flex-col items-center rounded-[48px] bg-gradient-to-t from-slate-700 to-slate-800 p-4'>
            <span className='text-lg font-bold text-slate-100'>
              <Logo size='128px' />
            </span>
            <span className='mt-1.5 text-lg text-slate-100'>CHRONO</span>
          </div>
        </div>
        <h1 className='mb-12 hidden text-6xl font-light text-slate-400 sm:flex'>
          Welcome back!
        </h1>
        <section className='mb-11 flex w-72 flex-col'>
          <InputText
            label='Email'
            placeholder='example@company.com'
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            value={email}
          />
          <InputText
            label='Password'
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
          />
          <button
            type='submit'
            className='mx-8 mt-8 mb-4 items-center justify-center rounded bg-slate-700 py-2 text-lg'
            onClick={onEmailLogin}
          >
            <span className='text-slate-100'>Sign in</span>
          </button>

          <div className='mb-4 flex items-center'>
            <span className='flex h-px flex-1 bg-slate-200' />
            <span className='mx-3 text-sm font-light text-slate-400'>Or</span>
            <span className='flex h-px flex-1 bg-slate-200' />
          </div>

          <div className='mx-8 h-10'>
            <GoogleLogin
              onSuccess={onGoogleLoginSuccess}
              onError={onGoogleLoginError}
            />
          </div>
          <div className='relative mx-12 mt-2 h-2 overflow-hidden rounded-sm bg-white'>
            {loading === 'oauth' && (
              <div className='animate-slide absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white via-slate-600 via-75% to-white' />
            )}
          </div>
        </section>
        <Link to='' className='mb-8 text-lg text-slate-800'>
          Forgotten your password?
        </Link>
      </div>

      <div className='hidden h-screen w-1/3 max-w-lg flex-col items-center justify-center bg-gradient-to-b from-slate-700 to-slate-500 drop-shadow-2xl sm:flex'>
        <section className='flex flex-col items-center px-14'>
          <h1 className='mb-8 text-center text-6xl font-black text-slate-300'>
            New here?
          </h1>
          <p className='mb-16 text-center text-2xl font-light text-slate-200'>
            Sign up to start tracking your activities!
          </p>
          <Link
            to=''
            className='rounded bg-slate-100 px-14 py-3 text-xl text-slate-700'
          >
            Learn more
          </Link>
        </section>
      </div>

      {showSplash && (
        <div className='absolute z-20 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-slate-700 to-slate-800'>
          <div className='mb-14 flex h-48 w-48 flex-col items-center rounded-[48px] p-4'>
            <span className='text-lg font-bold text-slate-200'>
              <Logo size='128px' />
            </span>
            <span className='mt-1.5 text-lg text-slate-200'>CHRONO</span>
          </div>
          <h1 className='mb-5 text-4xl font-light text-slate-400'>
            Welcome back!
          </h1>
          <h2 className='text-5xl text-slate-300'>{userData?.givenName}</h2>
          <div className='flex h-60 w-60'></div>
        </div>
      )}
    </div>
  );
}
