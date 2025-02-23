import { useState } from "react";

function CopyJSONExample() {
  const sampleJSON = `{
    "examTitle": "Sample Exam",
    "questions": [
      {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "answer": "Paris"
      },
      {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "answer": "Mars"
      }
    ]
  }`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 sec
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold mb-2"> Don&apos;t have a JSON file? Try using this sample format:</h2>
      <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
        <code>{sampleJSON}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="mt-2 submit text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {copied ? "Copied!" : "Copy Format"}
      </button>
    </div>
  );
}

export default CopyJSONExample;
