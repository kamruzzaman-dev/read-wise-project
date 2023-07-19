import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { LoginForm } from '@/components/LoginForm';

export default function Login() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/signup"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'absolute right-4 top-4 md:right-8 md:top-8 border-b-[3px] border-[#0B666A]'
          )}
        >
          Signup
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage:
                'url(https://source.unsplash.com/_-hjiem5TqI)',
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link to="/">
              <img className="h-20" src={logo} alt="" />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2"></blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below
              </p>
            </div>
            <LoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
