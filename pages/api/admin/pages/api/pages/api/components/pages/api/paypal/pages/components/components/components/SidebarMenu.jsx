// components/SidebarMenu.jsx

import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  MessageSquareText,
  Code2,
  FileText,
  Brain,
  Rocket,
} from 'lucide-react';

const navItems = [
  { label: 'Chat', icon: <MessageSquareText size={20} />, href: '/chat' },
  { label: 'Code', icon: <Code2 size={20} />, href: '/code' },
  { label: 'FileBrain', icon: <FileText size={20} />, href: '/file-brain' },
  { label: 'DeepSeek', icon: <Brain size={20} />, href: '/deepseek' },
  { label: 'Pricing', icon: <Rocket size={20} />, href: '/pricing' },
];

const SidebarMenu = () => {
  const router = useRouter();

  return (
    <div className="h-full w-full md:w-64 bg-[#1e293b] p-4 shadow-xl rounded-xl">
      <h2 className="text-neon-blue text-2xl font-bold mb-6 text-center">🧠 VORTEX.X</h2>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium
                  ${
                    isActive
                      ? 'bg-neon-blue text-black'
                      : 'text-white hover:bg-[#334155]'
                  } transition duration-200`}
              >
                {item.icon}
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarMenu;
