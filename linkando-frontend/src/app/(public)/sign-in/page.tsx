import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import logo from "../../../assets/logo.png";
import background from "../../../assets/background.png";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="flex flex-col justify-center space-y-6">
          <div className="self-start">
            <Image
              src={logo}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900">
              Encurte seus links com segurança.
            </h2>
            <p className="text-gray-600">
              Use sua conta Google ou GitHub para entrar com segurança
            </p>

            <div className="flex flex-row gap-3 w-full max-w-sm">
              <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-5 py-2 bg-white hover:bg-gray-100 transition w-1/2">
                <FaGithub className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Github
                </span>
              </button>

              <button className="flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 transition text-white rounded-md px-5 py-2 w-1/2">
                <FaGoogle className="w-4 h-4 rounded-full" />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            <div className="flex items-center w-full max-w-sm text-gray-500 text-xs font-medium my-2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-3">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="text-xs text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center relative">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <Image
              src={background}
              alt="Background Illustration"
              width={877}
              height={920}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
