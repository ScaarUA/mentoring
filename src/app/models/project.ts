export class Project {
    constructor(
        public _id: number = null,
        public title: string = '',
        public description: string = '',
        public isPrivate: boolean = false,
        public flows: any[] = []
    ) {
    }
}
