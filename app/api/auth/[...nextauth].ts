// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
        const user = {id:1,nombre:'nacho',email:'ignacio@gmail.com', }
        // If no error and we have user data, return it
        if (/*res.ok &&*/ user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newAccount: '/auth/new-account'
  },
  callbacks: {
    async session({ session, token }:any) {
      // Puedes agregar información adicional a la sesión aquí
      return session;
    },
    async redirect({ url, baseUrl }:any) {
      // Personaliza las redirecciones aquí
      return baseUrl;
    }
  }
};

export default NextAuth(authOptions);