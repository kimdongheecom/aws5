'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
        <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
        
        <motion.div
          variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
        >
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block no-underline">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/logo/lif-logo.svg"
                  alt="LIF 로고"
                  width={150}
                  height={60}
                  className="mb-2"
                  style={{ height: 'auto' }}
                />
                <p className="text-lg text-green-700 italic mt-1 tracking-wide">Life, Intelligence, Future</p>
              </div>
            </Link>
          </div>
          
          {children}
        </motion.div>
      </div>
    </section>
  );
} 