# Anime recommender web app

Uses React, Next.js, trpc, tailwind CSS, and prisma

### Users can:

- Login, signup, and reset password using clerk components
- Review recommended animes
- View, add, and remove animes from watchlist
- View stats and info on their liked animes
- Explore all animes in the database

### Auth is handled via clerk and users are instantiated in the db via webhooks.

### Recommendation algorithm:

50% chance of pulling a random (unreviewed) anime from the db
50% chance of pulling based on category, explained below:

- the percentages of liked categories form a distribution
  (For example, if a user likes 2 animes with the following categories [#1: action & adventure, #2: action], the distribution is 0-66% action, 67-100% adventure)
- a random number is selected between 0-100
- the percentage range that contains the random number is chosen
  (in the example above, if the generated random number was 45, this would fall between 0-66, so the action category would be chosen)
- randomly choose an unreviewed anime of that chosen category

P.S. TRPC is amazing.
