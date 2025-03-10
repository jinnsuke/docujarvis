
import React from 'react';
import { ScanIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <ScanIcon size={28} className="text-jarvis-blue" />
          <span className="text-xl font-bold text-jarvis-blue">JarvisAI</span>
          <span className="bg-jarvis-lightBlue text-white text-xs px-2 py-1 rounded-full ml-2">
            POC
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">BSC Sales Rep Portal</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
