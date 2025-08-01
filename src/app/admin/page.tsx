'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminSignInPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // For now, just redirect to dashboard (no validation)
    // Later you can add actual authentication logic here
    if (username && password) {
      router.push('/admin/dashboard')
    } else {
      alert('Please enter username and password')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-white p-8 shadow rounded w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Admin Sign In</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="border p-2 w-full mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}