import { Component, OnInit } from '@angular/core';
import { DeepSpeechService } from '../deepspeech.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.scss']
})
export class RecorderComponent implements OnInit{
  isRecording = false;
  audioChunks: Float32Array[] = [];
  mediaRecorder: any;
  sampleRate = 16000; // Sample rate used in the DeepSpeech model

  transcription: string = '';

  constructor(private deepSpeechService: DeepSpeechService) { }

  ngOnInit(): void {
    
  }
  async startRecording() {
    try {
      this.audioChunks = [];
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(mediaStream);

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const audioData = new Float32Array(arrayBuffer);
            this.audioChunks.push(audioData);
          };
          reader.readAsArrayBuffer(event.data);
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  async stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = false;

    const totalLength = this.audioChunks.reduce((total, chunk) => total + chunk.length, 0);
    const audioData = new Float32Array(totalLength);
    let offset = 0;

    this.audioChunks.forEach((chunk) => {
      audioData.set(chunk, offset);
      offset += chunk.length;
    });

    // this.transcription = await this.deepSpeechService.transcribe(audioData, this.sampleRate);
  }
}
