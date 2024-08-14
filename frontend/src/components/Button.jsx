export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
