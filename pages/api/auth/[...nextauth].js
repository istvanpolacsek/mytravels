import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from 'lib/mongo/db';

export default NextAuth({
  providers: [
    GoogleProvider({ clientId: process.env.NEXTAUTH_GOOGLE_ID, clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: { jwt: true },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
  },
});
