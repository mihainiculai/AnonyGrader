import { redirect } from 'next/navigation'

export default function Root() {
    redirect('/auth/login')
    return null
}