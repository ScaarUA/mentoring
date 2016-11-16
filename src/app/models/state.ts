export class State {
    constructor(
        public id: string,
        public file: any,
        public hotspots: Array<Object>,
        public title: string, //
        public description: string, //
        public created: Date, //
        public edited: Date,
        public flow: string
    ) {}
}
