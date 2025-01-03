import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const ModalTwo = () => {
  return (
    <dialog id="my_modal_4" className="modal  ">
      <div className="modal-box bg-black text-left p-8">
      <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
      <h1 className="font-bold my-4">GROOVEGURU:</h1>
          <p>
          GrooveGuru is an AI-enhanced playlist generator that analyzes your saved Spotify songs and uses OpenAI to create vector embeddings, enabling smart search capabilities. By leveraging these embeddings, GrooveGuru allows you to search your music collection based on mood, feeling, genre, or general description. You can quickly select songs in bulk and seamlessly create personalized playlists. The application stack includes React.js, Node.js, Express.js, PostgreSQL, Tailwind CSS, DaisyUI, and Jest.
</p>
<p className="font-bold my-4">Key Features:</p>
<ul className="list-disc list-inside">
  <li>
AI Integration: Utilizes OpenAI for intelligent playlist curation.
</li><li>
Spotify Integration: Seamlessly integrates with Spotify to gather user data and manage music preferences.</li><li>
Modern UI: Built with Tailwind CSS and DaisyUI for a responsive and aesthetic user interface.</li><li>
Backend Efficiency: Powered by Node.js and Express.js for a robust and scalable backend.</li><li>
Testing: Ensures reliability through Jest for unit and integration testing.</li>
</ul>
<p className="font-bold my-4">Highlights:</p>
<p>Demonstrates expertise in data management, automation, and API integration.</p>

<p className="my-4"><b>GitHub Repository:</b> <a className="text-blue-400 hover:underline" href="https://github.com/skval55/Capstone-2" target="_blank">GrooveGuru on GitHub </a></p>
        </form>
      </div>
    </dialog>
  );
};

export default ModalTwo;
