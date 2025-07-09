export default function App() {

  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((antwort) => antwort.json())
    .then((daten) => console.log(daten))
  return (
    <div>
      <h1>
        Schau in die Konsole :D
      </h1>
    </div>
  );
}