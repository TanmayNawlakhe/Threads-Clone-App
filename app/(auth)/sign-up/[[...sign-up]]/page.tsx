import { SignUp } from '@clerk/nextjs'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Page() {
  return <SignUp/>
}