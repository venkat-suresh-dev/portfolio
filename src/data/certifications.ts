export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "[PLACEHOLDER]",
    issuer: "[PLACEHOLDER]",
    date: "[PLACEHOLDER]",
    credentialUrl: "https://example.invalid/[PLACEHOLDER]",
  },
  {
    id: "cert-2",
    name: "[PLACEHOLDER]",
    issuer: "[PLACEHOLDER]",
    date: "[PLACEHOLDER]",
  },
  {
    id: "cert-3",
    name: "[PLACEHOLDER]",
    issuer: "[PLACEHOLDER]",
    date: "[PLACEHOLDER]",
    credentialUrl: "https://example.invalid/[PLACEHOLDER]",
  },
  {
    id: "cert-4",
    name: "[PLACEHOLDER]",
    issuer: "[PLACEHOLDER]",
    date: "[PLACEHOLDER]",
  },
];
