// src/components/SocialButton.tsx
import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface SocialButtonProps {
  provider: 'google' | 'github';
  onClick: () => void;
  isLoading?: boolean;
}

const SocialButton: FC<SocialButtonProps> = ({ provider, onClick, isLoading }) => {
  const styles = {
    google: 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100',
    github: 'bg-gray-700 text-white hover:bg-gray-600',
  };

  const labels = {
    google: 'Continuar com Google',
    github: 'Continuar com GitHub',
  };

  const icons = {
    google: <FcGoogle className="w-5 h-5" />,
    github: <FaGithub className="w-5 h-5" />,
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-3 px-5 py-2 rounded-md transition ${styles[provider]}`}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : (
        icons[provider]
      )}
      <span className="text-sm font-medium">{labels[provider]}</span>
    </button>
  );
};

export default SocialButton;
