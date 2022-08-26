import { access, constants, createReadStream, mkdir, unlink, open, close, read } from 'node:fs';
import { FReader } from './reader';
import { resolve, sep } from "node:path";
import { FWriter } from './writer';

/**
 * Interface to interact with the file system easily
 */

export class FileC {

    /**
     * Constructs the file object
     * @param path Path of the file/directory to wrap
     */

    constructor(readonly path: string) {

    }
    
    /**
     * Asynchronously tests access on the current file
     * @param mode Mode to test access with
     * @returns True if the access passes, otherwise false
     */

    access(mode: number) {
        return new Promise<boolean>((res) => {
            access(this.path, mode, (er) => {
                if (er) {
                    res(false);
                } else {
                    res(true);
                }
            });
        });
    }

    /**
     * Asynchronously checks if the current file exists
     * @returns True if the file exists, otherwise false
     */

    async exists() {
        return this.access(constants.F_OK);
    }

    /**
     * Creates a new FReader object
     * @returns The newly created FReader object
     */

    reader() {
        return new FReader(this);
    }

    /**
     * Creates a new FWriter object
     * @returns The newly created FWriter object
     */

    writer() {
        return new FWriter(this);
    }

    /**
     * Creates a readstream on the current file
     * @param encoding Type of encoding to open the readstream with
     * @returns The created readstream
     */

    readStream(encoding: BufferEncoding = "utf-8") {
        return createReadStream(this.path, { encoding });
    }

    #mkDir(path: string) {
        return new Promise<void>((res, rej) => {
            mkdir(path, (e) => {
                if(e) rej(e);
                res();
            });
        });
    }

    /**
     * Asynchronously makes the directory specified
     */

    async mkDir() {
        if(await this.exists()) {
            return;
        }

        // mkdir(this.path, () => {

        // });
        await this.#mkDir(this.path).catch(console.log);

        return;
    }

    /**
     * Asynchronously makes the directories specified
     */

    async mkDirs() {
        const dirs = resolve(this.path).split(sep);

        var concatDir: string = "";
        for(let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            concatDir += dir + (dirs.length - 1 == i ? "" : sep);

            await new FileC(concatDir).mkDir();
        }
    }

    /**
     * Asynchronously deletes the current file
     */

    delete() {
        return new Promise<void>((res, rej) => {
            unlink(this.path, (e) => {
                if(e) rej(e);
                res();
            });
        });
    }

    /**
     * Asynchronously opens the current file
     * @param mode Mode to open the current file with
     * @returns The file descriptor
     */

    open(mode: string) {
        return new Promise<number>((res, rej) => {
            open(this.path, mode, (e, fd) => {
                if(e) rej(e);
                res(fd);
            });
        });
    }

    /**
     * Asynchronously closes the current file
     * @param fd File descriptor of which file to close
     */

    close(fd: number) {
        return new Promise<void>((res, rej) => {
            close(fd, (e) => {
                if(e) rej(e);
                res();
            });
        });
    }

    /**
     * Asynchronously creates a file if it doesn't currently exist
     * @returns True if the file already exists, otherwise creates the file and returns false 
     */

    async create() {
        if(await this.exists()) {
            return true;
        }

        const fd = await this.open("w");

        await this.close(fd);

        return false;
    }
}