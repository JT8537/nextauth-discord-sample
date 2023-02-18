// nextauth.ts
import NextAuth, { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: { scope: 'identify guilds' },
      },
    }),
  ],

  callbacks: {
    /**
     * sessionにaccessTokenと、user.idを追加
     */
    session: async ({ session, token }) => {
      //ここでsessionにaccessTokenを生やした
      session.accessToken = token.accessToken as string
      session.user
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },

    /**
     * jwtにaccessTokenと、profile.idを追加
     */
    jwt: async ({ token, account, profile }) => {
      if (account && account.access_token) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.id = profile.id
      }
      return token
    },
  },
}

export default NextAuth(authOptions) //調べたことを試したことにより、この式は呼び出し可能ではありません。型 'typeof import("root/types/next-auth")' には呼び出しシグネチャがありません。とエラーが
