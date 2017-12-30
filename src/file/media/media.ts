import * as fs from "fs";
import * as path from "path";
import { IMediaData } from "./data";

export class Media {
    private map: Map<string, IMediaData>;

    constructor() {
        this.map = new Map<string, IMediaData>();
    }

    public getMedia(key: string): IMediaData {
        const data = this.map.get(key);

        if (data === undefined) {
            throw new Error(`Cannot find image with the key ${key}`);
        }

        return data;
    }

    public addMedia(key: string, filePath: string): void {
        this.map.set(key, {
            referenceId: this.map.values.length,
            stream: fs.createReadStream(filePath),
            path: filePath,
            fileName: path.basename(filePath),
        });
    }

    public get array(): IMediaData[] {
        const array = new Array<IMediaData>();

        this.map.forEach((data) => {
            array.push(data);
        });

        return array;
    }
}
