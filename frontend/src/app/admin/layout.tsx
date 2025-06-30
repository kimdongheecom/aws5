"use client";

import React from 'react';
import RoleSelector from '@/components/RoleSelector';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
      <RoleSelector />
    </div>
  );
}