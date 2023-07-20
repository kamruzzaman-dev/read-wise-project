/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';

import * as React from 'react';

import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import { cn } from '../lib/utils.ts';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../utils/localstorage.ts';
import { useLoginMutation } from '../redux/features/user/userApi.ts';
import { Notification } from './ui/notification.tsx';
import { useGoogleAuth } from '../hooks/useGoogleAuth.tsx';
import GoogleLogin from "react-google-login";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();

  // API call
  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginMutation();

  // log in with google Oauth
  const { responseErrorGoogle, responseSuccessGoogle, isLoading: loading } = useGoogleAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    login({ email: data.email, password: data.password });
  };

  const { state } = useLocation();
  React.useEffect(() => {
    if (isSuccess && !isLoading) {
      if (state?.path) {
        navigate(state?.path);
      } else {
        navigate('/');
      }
      Notification("You have logged in successfully.", "success")
      saveToLocalStorage('access-token', data?.data?.accessToken);
      saveToLocalStorage('user_Information', JSON.stringify(data?.data?.userData));
    }
    if (isError === true && error) {
      if ('data' in error) {
        Notification((error as any).data!.message, "error")
      }
    }
  }, [isLoading, navigate, state, isSuccess, error, isError, data]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button>Login with email</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleLogin
        clientId="733785501526-kf7fkkbo5i29t9kjq2npllh2fd14fvhj.apps.googleusercontent.com"
        render={renderProps => (
          <button onClick={renderProps.onClick} className="inline-flex items-center p-2 justify-between rounded-md bg-secondary" disabled={renderProps.disabled}>
            <p>{loading ? "Loading..." : "Sign in with Google"}</p>
            <FcGoogle />
          </button>
        )}
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {/* document.getElementById('googleButton') */}
    </div>
  );
}
