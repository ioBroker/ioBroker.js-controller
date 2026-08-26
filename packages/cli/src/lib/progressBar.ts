/**
 * A single-line progress bar for terminals which can overwrite their own output.
 *
 * Used where the CLI has a long-running job with a known number of steps. When the output does not
 * go to a terminal - a pipe, a log file, a CI job - a bar would only leave a trail of control
 * characters, so callers ask {@link ProgressBar.isSupported} first and keep their line-based output
 * otherwise.
 */

/** Redraw no more often than this, so a large job does not spend its time drawing, in ms */
const MIN_REDRAW_INTERVAL = 100;
/** Below this width the bar carries no information and only the numbers are printed */
const MIN_BAR_WIDTH = 10;
/** Assumed terminal width when the stream does not report one */
const DEFAULT_COLUMNS = 80;

/** Move to the start of the line */
const CR = '\r';
/** Erase from the cursor to the end of the line, so a shorter line leaves no remains */
const CLEAR_TO_END = '\u001B[K';

/**
 * Draws progress as a bar which overwrites its own line.
 *
 * Callers decide whether to use it - see {@link ProgressBar.isSupported} - and keep their own
 * line-based output when the destination is not a terminal.
 */
export class ProgressBar {
    private readonly label: string;
    private readonly total: number;
    private readonly stream: NodeJS.WriteStream;

    /** Timestamp of the last redraw, to keep the throttle */
    private lastRedraw = 0;
    /** Whether a bar is currently on screen and its line still open */
    private open = false;

    /**
     * @param label Shown in front of the bar, e.g. the name of what is being uploaded
     * @param total Number of steps that make up 100%
     * @param stream Where to draw, defaults to stdout
     */
    constructor(label: string, total: number, stream: NodeJS.WriteStream = process.stdout) {
        this.label = label;
        this.total = total;
        this.stream = stream;
    }

    /**
     * Whether this stream can show a progress bar at all
     *
     * @param stream The stream the bar would be drawn to, defaults to stdout
     */
    static isSupported(stream: NodeJS.WriteStream = process.stdout): boolean {
        return !!stream?.isTTY;
    }

    /**
     * Draw the current progress, throttled
     *
     * The last step is always drawn, so the bar never stops short of the number it ends on.
     *
     * @param done How many steps are finished
     */
    update(done: number): void {
        const now = Date.now();

        if (this.open && done < this.total && now - this.lastRedraw < MIN_REDRAW_INTERVAL) {
            return;
        }

        this.lastRedraw = now;
        this.open = true;
        this.stream.write(`${CR}${this.render(done)}${CLEAR_TO_END}`);
    }

    /**
     * Close the line without completing the bar, so other output can be written
     *
     * Needed before an error or a warning is printed: without it the message would land in the
     * middle of the bar and the next redraw would overwrite it.
     */
    interrupt(): void {
        if (this.open) {
            this.stream.write('\n');
            this.open = false;
        }
    }

    /** Draw the bar as complete and close its line */
finish(): void {
        this.stream.write(`${CR}${this.render(this.total)}${CLEAR_TO_END}\n`);
        this.open = false;
    }

    /**
     * Build the bar as it is written to the terminal
     *
     * @param done How many steps are finished
     */
    private render(done: number): string {
        const percent = this.total > 0 ? Math.min(100, Math.floor((100 * done) / this.total)) : 100;
        // padded, so the following text does not jump around while the number grows
        const suffix = ` ${String(percent).padStart(3)}% (${done}/${this.total})`;
        const prefix = `${this.label} `;
        const columns = this.stream.columns || DEFAULT_COLUMNS;
        // the two brackets, and one column kept free so the line cannot wrap
        const width = columns - prefix.length - suffix.length - 3;

        if (width < MIN_BAR_WIDTH) {
            return prefix + suffix.trimStart();
        }

        const filled = Math.round((width * percent) / 100);

        return `${prefix}[${'█'.repeat(filled)}${'░'.repeat(width - filled)}]${suffix}`;
    }
}
