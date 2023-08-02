import { Injectable } from '@angular/core';
import * as DeepSpeech from 'deepspeech'; // Import the deepspeech library


@Injectable({
  providedIn: 'root',
})
export class DeepSpeechService {
  private modelPath = '../assets/deepspeech-0.9.3-models.pb'; // Path to your DeepSpeech model file
  private scorerPath = '../assets/deepspeech-0.9.3-models.scorer'; // Path to your DeepSpeech scorer file
  private model: any;

  constructor() {
    this.loadModel();
  }

  private loadModel() {
    this.model = new DeepSpeech.Model(this.modelPath);
    this.model.enableExternalScorer(this.scorerPath);
  }

  public async transcribe(audioData: Float32Array, sampleRate: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const audioLength = (audioData.length * (1 / sampleRate)) | 0;
      const result = this.model.stt(audioData, sampleRate);
      resolve(result);
    });
  }
}
