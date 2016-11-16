import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[imagePreview]'
})
export class ImagePreviewDirective implements OnInit {
    @Input('imagePreview') private imageElementId: string;

    constructor(
        private el: ElementRef
    ) {}

    public ngOnInit() {
        this.el.nativeElement.addEventListener('change', (changeEvt) => {
            let file = changeEvt.srcElement.files[0];
            let reader = new FileReader();

            reader.onload = (readEvt) => {
                let imageElement: any = document.getElementById(this.imageElementId);
                let urlResultObj: any = readEvt.srcElement;

                imageElement.style.backgroundImage = `url(${urlResultObj.result})`;
            };

            reader.readAsDataURL(file);
        });
    }
}
