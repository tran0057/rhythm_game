import { BeatmapDecoder } from 'osu-parsers';

interface Note {
    time: number;
    lane: number;
    hit: boolean;
}

class RhythmGameEngine {
    private notes: Note[] = [];
    private startTime: number = 0;
    private audio: HTMLAudioElement;

    constructor(audioElement: HTMLAudioElement) {
        this.audio = audioElement;
    }

    // Load and parse an .osu file content string or Blob
    public async loadOsuFile(fileContent: string) {
        const decoder = new BeatmapDecoder();
        const beatmap = decoder.decodeFromString(fileContent);

        // Extract hit objects and map them to 4 vertical lanes (0 to 3)
        this.notes = beatmap.hitObjects.map((obj) => ({
            time: obj.startTime, // in milliseconds
            lane: Math.min(Math.floor((obj.startX / 512) * 4), 3),
            hit: false
        }));

        console.log(`Loaded ${this.notes.length} notes successfully!`);
    }

    public start() {
        this.startTime = performance.now();
        this.audio.play();
        this.gameLoop();
    }

    private gameLoop = () => {
        const currentTime = this.audio.currentTime * 1000; // Convert to ms

        // Render falling notes and check positions based on currentTime...
        
        requestAnimationFrame(this.gameLoop);
    }
}