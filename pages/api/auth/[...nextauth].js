import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Google({
        clientId: process.env.NEXTAUTH_GOOGLE_ID,
        clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
        protection: "pkce"
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: false
  },
  database: process.env.NEXTAUTH_DATABASE_URL,
  callbacks: {
    session: async (session, user) => {
      session.user.id = user.id;
      return Promise.resolve(session)
    }
  }
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth;