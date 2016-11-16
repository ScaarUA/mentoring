import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[inputFocus]'
})
export class InputFocusDirective implements OnInit {

    constructor(
        private el: ElementRef
    ) {}

    public ngOnInit() {
        this.el.nativeElement.focus();
    }
}
