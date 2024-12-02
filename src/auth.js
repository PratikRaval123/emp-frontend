import Credentials from "next-auth/providers/credentials";

const API_ENDPOINT = "http://localhost:4500/api/auth/login";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        const { email, password } = credentials;
        console.log(credentials, "credentials");

        try {
          const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const data = await response.json();
            console.log(data, "data");
            throw new Error(data?.message);
          }

          const user = await response.json();
          console.log(user, "user");
          // const userRole = user.data.role;
          const userFirstName = user.data.name;
          // const userLastName = user.data.lastName;
          const userEmail = user.data.email;
          const jwt = user.token;
          return {
            ...credentials,
            jwt,
            // user,
            // role: userRole,
            userFirstName,
            // userLastName,
            userEmail,
          };
        } catch (error) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.jwt = token.jwt;
        // session.role = token.role;
        session.userFirstName = token.userFirstName;
        // session.userLastName = token.userLastName;
        session.userEmail = token.userEmail;
        // session.role = "technician";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          // role: user.role,
          userFirstName: user.userFirstName,
          // userLastName: user.userLastName,
          userEmail: user.userEmail,
          // user: user.data,
          // role: "technician",
        };
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
