import Header from '../components/auth/Header';
import Signup from '../components/auth/Signup';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';

export default function SignupPage() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Header
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/"
          />
          <Signup />
          <span className="block text-center text-sm text-gray-600">
            Or continue with
          </span>
          <GoogleSignInButton text="signup_with" />
        </div>
      </div>
    </>
  );
}
