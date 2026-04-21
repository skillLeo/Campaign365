'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GotvRoot() {
  const router = useRouter();
  useEffect(() => { router.replace('/gotv/dashboard'); }, [router]);
  return null;
}
