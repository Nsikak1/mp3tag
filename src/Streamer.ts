class Streamer {
  musicBuffer: ArrayBuffer;
  offset: number;
  decoder: TextDecoder;
  length: number = 0;
  constructor(musicBuffer: ArrayBuffer, offset: number) {
    this.musicBuffer = musicBuffer;
    this.offset = offset;
    this.decoder = new TextDecoder();
  }

  stream(length: number) {
    this.length = length;
    let content = this.decoder.decode(
      new Uint8Array(this.musicBuffer, this.offset, this.length)
    );
    this.offset += this.length;
    content = content.replace(
      /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g,
      ""
    );
    return content;
  }
}
export default Streamer;
