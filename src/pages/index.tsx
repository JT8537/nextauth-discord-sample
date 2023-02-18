// import Layout from '../components/Layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import type { FC } from 'react'

export const Home: FC = () => {
  const { data: session } = useSession()

  const handleClick = async () => {
    const res = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`, //該当箇所
      },
    })
    console.log('res', res)
  }

  return <button onClick={handleClick}>ギルド情報を取得</button>
}

// export default Home

export default function IndexPage() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        You&apos;re signed in! Congratulations! <br />
        {session?.accessToken}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('discord')}>Sign in</button>
    </>
  )
}
