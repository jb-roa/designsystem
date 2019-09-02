import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent {
  @Input() showBackdrop = true;
  constructor() {}
}
