export class Flow {
    constructor(
        public _id: number = null,
        public state: any = '', // string or object
        public title: string = '',
        public description: string = ''
    ) {
    }
}
