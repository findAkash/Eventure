import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import Header from '../components/auth/Header';
import Login from '../components/auth/Login';

export default function LoginPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
          />
          <Login />
          <span className="block text-center text-sm text-gray-600">
            Or continue with
          </span>
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
}
