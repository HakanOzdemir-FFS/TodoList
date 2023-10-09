import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 bg-opacity-85 fixed bottom-0 left-0 right-0 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">© {currentYear} TodoApp</p>
        <p>
          Made with by{" "}
          <a
            href="https://www.linkedin.com/in/hakan-özdemir-25152511b"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hakan Ozdemir
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
