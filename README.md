# Pegaz 2.0
This is a small Next.js project for Web Programming course @ Jagiellonian University.  The app is based on the  university e-learning platform - [Pegaz](https://pegaz.uj.edu.pl/).
It has less functionality but a more modern UI and tech stack.

# How it works

Use Home Page to see recently opened courses and upcomming assignments.
![Home](/docs/home.png)

Navigate to Courses tab to see all your courses. You will see a course here if you are the owner or a student.
![Courses](/docs/courses.png)

Click on one of the courses to see its contents, submit assignment solutions if you are a student, or grade assignments if you are the owner of the course.
![Course](/docs/course.png)

# Tech stack
I built the app using:
- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Neon Serverless Postgres](https://neon.tech/)
- [Pirsma](https://www.prisma.io/)

# Setup
- clone this repository
- create a .env file in the root of the project - similar to .env.example file
- use [Neon docs](https://neon.tech/docs/guides/nextjs) to setup the database
- use [Prisma docs](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction) to setup prisma
- create a .env.local file in the root of the project - similar to .env.local.example file
- use [Auth.js docs](https://authjs.dev/getting-started/installation) to setup authentication
- use [Auth.js github integration docs](https://authjs.dev/getting-started/authentication/oauth) to setup GitHub as OAuth provider
