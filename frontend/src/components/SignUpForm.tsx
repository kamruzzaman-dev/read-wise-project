'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../utils/localStorage.ts';
import { useSignUpMutation } from '../redux/features/user/userApi.ts';
import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import { Button } from './ui/button.tsx';
import { cn } from '../lib/utils.ts';
import { Notification } from './ui/notification.tsx';
import GoogleLogin from 'react-google-login';
import { useGoogleAuth } from '../hooks/useGoogleAuth.tsx';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

interface SignupFormInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
  phoneNumber: string;
}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();

  // API call
  const [signUp, { data, isError, isLoading, isSuccess, error }] =
    useSignUpMutation();

  // log in with google Oauth
  const { responseErrorGoogle, responseSuccessGoogle, isLoading: loading } = useGoogleAuth();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupFormInputs>();

  // handle submit
  const onSubmit = (data: SignupFormInputs) => {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      phone: data.phoneNumber,
    };
    signUp(newData);
  };

  // password and confirm password validation
  const validatePassword = (value: string) => {
    const { password } = getValues();
    return value === password || 'Passwords do not match';
  };

  // navigate after successful signup and notify user for error and successes
  React.useEffect(() => {
    if (isSuccess && !isLoading) {
      navigate('/');
      Notification("You have signed in successfully.", "success")
      saveToLocalStorage('access-token', data.data.accessToken);
      saveToLocalStorage('user_Information', JSON.stringify(data?.data?.result));
    }

    if (isError === true && error) {
      Notification("Something went wrong! Please try again.", "error")
    }
  }, [isError, isLoading, isSuccess, navigate, error, data]);


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
              placeholder="your email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <Input
              id="name"
              placeholder="your name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <Input
              id="phoneNumber"
              placeholder="your phone number"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('phoneNumber', { required: 'Phone is required' })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500"> {errors.phoneNumber.message}</p>
            )}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <Input
              id="confirmPassword"
              placeholder="confirm password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: validatePassword,
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button>Create Account</Button>
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
    </div>
  );
}
