import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="container p-4 mx-auto mt-8 text-center text-white bg-red-500 border rounded">
      https://github.com/Gaurav-guru/cinema-ticket-booking
      </footer>
    </div>
  );
}
