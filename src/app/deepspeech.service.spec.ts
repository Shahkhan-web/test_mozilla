import { TestBed } from '@angular/core/testing';

import { DeepspeechService } from './deepspeech.service';

describe('DeepspeechService', () => {
  let service: DeepspeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepspeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
