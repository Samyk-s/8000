// src/app/admin/layout.tsx
import React from 'react'

export default function AdminRootLayout({children}: {children: React.ReactNode}) {
  // Simple layout without sidebar/navbar for login page
  return <>{children}</>;
}