// app/src/pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-4">
        <Link href="/login" className="block px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </Link>
        <Link href="/signup" className="block px-4 py-2 bg-green-500 text-white rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
}