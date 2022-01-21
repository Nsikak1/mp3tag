import "./style.css";
import Streamer from './Streamer';
;


let fileList: any;
let musicBuffer: ArrayBuffer;
const fileSelector = document.getElementById("fileInput")!;
fileSelector.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  fileList = target.files;
  readFile(fileList);
  setTimeout(() => {
    show(musicBuffer);
  }, 1000);
});

function readFile(fileList: FileList) {
  let fr = new FileReader();
  fr.readAsArrayBuffer(fileList[0]);
  fr.onload = function () {
    musicBuffer = fr.result as ArrayBuffer;
  };
}

function showVersion(musicBuffer: ArrayBuffer) {
  let decoder = new TextDecoder()
  let byte = new Uint8Array(musicBuffer, 3, 2);
  // let c = decoder.decode(byte)
  // let c = Number(byte[0].toString(2)) && 0b00011000;
console.log(byte);
  
}
function show(musicBuffer: ArrayBuffer) {
  let streamer = new Streamer(musicBuffer, musicBuffer.byteLength - 128);
  let header = streamer.stream(3)
  let title = streamer.stream(30)
  let artist = streamer.stream(30)
  let album = streamer.stream(30)
  let year = streamer.stream(4)
  let comment = streamer.stream(30)
  let genre = streamer.stream(1)

  console.log(`
  Header: ${header}
  Title: ${title}
  Artist: ${artist}
  Album: ${album}
  Year: ${year}
  Comment: ${comment}
  Genre: ${genre}
  `);  
}
