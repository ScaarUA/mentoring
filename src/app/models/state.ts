export class State {
    constructor(
        public id: string,
        public file: any,
        public hotspots: Array<Object>,
        public title: string, //
        public description: string, //
        public created: Date, //
        public edited: Date,
        public flow: string = '5828e07fa1d9b2246550e56c',
        public onCloud: Boolean = true
    ) {}
}
