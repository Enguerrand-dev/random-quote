import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Quote } from '../typing'
import { BiRefresh } from 'react-icons/bi'
import { AiOutlineTwitter } from 'react-icons/ai'
interface Props {
  quotes: Quote[]
}

const Home = ({ quotes }: Props) => {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [quotes])

  const handleQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Want a quote ?</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mb-10 text-4xl font-bold">U want a quote ?</h1>
          <div id="quote-box" className="transition">
            <p id="text" className="text-xl">
              {quote?.quote}
            </p>
            <span
              id="author"
              className="mt-1.5 flex justify-center font-light underline underline-offset-4"
            >
              {quote?.author}
            </span>
            <div className="mt-10 flex items-center justify-center space-x-5">
              <button
                id="new-quote"
                onClick={handleQuote}
                className="rounded-3xl bg-blue-500  font-bold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
              >
                <BiRefresh className="h-7 w-7" />
              </button>
              <a
                id="tweet-quote"
                target={'_blank'}
                href={`https://twitter.com/intent/tweet/?text:${quote?.quote}`}
                className="rounded-3xl bg-blue-500  font-bold text-white transition-colors duration-200 ease-in-out hover:bg-blue-700"
              >
                <AiOutlineTwitter className="h-7 w-7 text-white" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const quotes = await fetch(
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
  ).then((res) => res.json())
  return {
    props: {
      ...quotes,
    },
  }
}
