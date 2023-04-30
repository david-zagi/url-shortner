import { useEffect } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import urlHandler from '../pages/api/url';
import axios from 'axios'

import useSWR, { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  useEffect(() => {
    const getShortUrl = async () => {
      const fetcher = axios.post('/api/url', { longUrl: 'https://www.pcmag.com/encyclopedia/term/long-url' })
      return fetcher;
    }
    try {
       getShortUrl().then((result) => {
      console.log({result})
    })
    } catch (error) {
      console.log({error})
    }
   

  },[])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

       <h1>{}</h1>
    </main>
  )
}
