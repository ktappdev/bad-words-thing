<h1>Bad Words Thing - Web Application for Detecting Profanity in Songs</h1> <h2>Description:</h2> <p>Bad Words Thing is a web application built with Next.js that allows users to scan lyrics of songs online and identify instances of profanity within the lyrics. With the increasing popularity of music streaming platforms, it can be challenging for users to determine the explicitness of songs before listening to them. This project aims to solve this problem by providing a user-friendly interface to scan lyrics and highlight any potentially offensive language, helping users make informed decisions about the songs they listen to.</p> <h2>Key Features:</h2> <ul> <li>Lyrics Scanning: The web app provides a convenient way to input the lyrics of a song and analyze its content for profanity.</li> <li>Profanity Detection: It leverages a custom database/API designed with Prisma and hosted on MongoDB to identify and highlight instances of profanity within the lyrics.</li> <li>Song Visualization: The application presents the scanned lyrics in an intuitive and visually appealing format, making it easier for users to identify the specific parts of a song that contain offensive language.</li> <li>User-Friendly Interface: The interface is designed to be intuitive and easy to navigate, ensuring a seamless user experience.</li> <li>Privacy and Security: The project prioritizes user privacy by performing all scanning and analysis locally within the browser, without sending any data to external servers.</li> </ul> <h2>Technologies Used:</h2> <ul> <li>Next.js: The web application is built using Next.js, a popular React framework that provides server-side rendering and other powerful features.</li> <li>JavaScript/TypeScript: The project utilizes JavaScript/TypeScript for the frontend logic and rendering.</li> <li>HTML/CSS: The application's user interface is developed using HTML and CSS, ensuring a visually appealing and responsive design.</li> <li>Prisma: The custom database and API integration is designed and implemented using Prisma, a powerful database toolkit.</li> <li>MongoDB: The project utilizes MongoDB as the database for storing and retrieving the lyrics data.</li> </ul> <p>We welcome contributions from the open-source community, including suggestions, bug reports, and feature requests. Join us in creating a safer and more informed music listening experience for everyone!</p> <p>Please note that ethical considerations should be taken into account when using and promoting this application.</p>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
