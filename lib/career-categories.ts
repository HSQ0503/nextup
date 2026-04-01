export type CareerCategory =
  | "healthcare"
  | "finance"
  | "engineering"
  | "creative-arts"
  | "law"
  | "education"
  | "technology"
  | "business";

export type CategoryInfo = {
  id: CareerCategory;
  name: string;
  description: string;
};

export const categories: CategoryInfo[] = [
  {
    id: "healthcare",
    name: "Healthcare & Medicine",
    description:
      "Careers in medicine, nursing, public health, physical therapy, or biomedical research. Ideal for people who want to help others stay healthy and solve medical challenges.",
  },
  {
    id: "finance",
    name: "Finance & Accounting",
    description:
      "Careers in banking, investing, financial planning, or accounting. Great for analytical minds who enjoy working with numbers and solving financial puzzles.",
  },
  {
    id: "engineering",
    name: "Engineering",
    description:
      "Careers in mechanical, civil, electrical, or aerospace engineering. Perfect for problem-solvers who love building things and understanding how systems work.",
  },
  {
    id: "creative-arts",
    name: "Creative Arts & Design",
    description:
      "Careers in graphic design, UX/UI, film, animation, writing, or creative direction. For people who think visually and love making things.",
  },
  {
    id: "law",
    name: "Law & Public Policy",
    description:
      "Careers in law, government, advocacy, or public policy. Suited for strong communicators who care about justice and systemic change.",
  },
  {
    id: "education",
    name: "Education & Counseling",
    description:
      "Careers in teaching, school counseling, curriculum design, or educational technology. Ideal for those who love mentoring and helping others grow.",
  },
  {
    id: "technology",
    name: "Technology & Software",
    description:
      "Careers in software engineering, data science, cybersecurity, or product management. Great for logical thinkers who enjoy building digital products.",
  },
  {
    id: "business",
    name: "Business & Entrepreneurship",
    description:
      "Careers in management, marketing, startups, or consulting. For natural leaders who enjoy strategy, communication, and building organizations.",
  },
];
