import "./globals.css";

export const metadata = {
  title: "Machine Learning Roadmap",
  description: "ML сурах замын зураг",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
