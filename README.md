# Minerva - Academic Work Social Network

Minerva is a social network platform designed to serve as a repository for academic projects and papers. It allows users to create an account, post their own academic works, and reference other projects both within and outside the platform. With features to follow other accounts, explore works, and receive personalized recommendations, Minerva aims to connect the academic community and help individuals discover valuable research and projects.

This project is developed independently as part of a graduation thesis (TCC). The backend is built with **TypeScript**, **Express**, and **Neo4j** for graph-based data storage.

### This project was discontinued using NodeJS and TypeScript. To check the current version, please check [Minerva Java](https://github.com/aaaalmeida/minerva-java).

## Features

- **Create an Account**: Users can sign up to have their own profile and start sharing their academic projects.
- **Post Your Work**: Share your own academic projects, including papers, articles, and research findings.
- **Reference Works**: Reference the works of others, even if they are not part of the platform.
- **Follow Accounts and Projects**: Follow other users to keep track of their work and activities.
- **Personalized Recommendations**: Receive recommendations for popular or relevant academic works based on your activity.
- **Explore Works**: Discover new and trending projects in the academic community.

## Tech Stack

- **Backend**: TypeScript with Express
- **Database**: Neo4j (Graph Database)
- **Environment**: Node.js

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/aaaalmeida/minerva-nodejs.git
    ```

2. Navigate to the project directory:

    ```bash
    cd minerva-nodejs
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Configure your environment variables by renaming the `.env.example` file to `.env`:

    ```bash
    mv .env.example .env
    ```

    Add your Neo4j and JWT secret information to the `.env` file. Example:

    ```env
        NEO4J_USER=your-neo4j-username (default is neo4j)
        NEO4J_PASSWRD=your-neo4j-password
        NEO4J_PORT=your-neo4j-port (default port is 7687)
        NEO4J_URL=your-default-neo4j-url (bolt://neo4j:7687)
        NODE_PORT=your-application-port (default is 3000)
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

The application should now be running at your defined *NODE_PORT* or `http://localhost:3000` if not previosly set.


## Contact

If you have any questions or need further information, feel free to contact me through the GitHub issues.

---

**Minerva** is a project created to make academic work sharing and collaboration easier, helping students, researchers, and academics to connect and build upon each other's work.
