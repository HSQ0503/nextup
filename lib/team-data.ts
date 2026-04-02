export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  isFounder?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Gabriel Rossi Nunciaroni",
    role: "Founder",
    bio: "High school student in Orlando, FL. Started NextStep to help students find direction.",
    isFounder: true,
  },
  {
    name: "Daniel Lopez",
    role: "Title TBD",
    bio: "Bio coming soon.",
  },
  {
    name: "Team Member",
    role: "Title TBD",
    bio: "Bio coming soon.",
  },
  {
    name: "Team Member",
    role: "Title TBD",
    bio: "Bio coming soon.",
  },
];
