import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-toggle-showcase',
  templateUrl: './toggle-showcase.component.html',
  styleUrls: ['./toggle-showcase.component.scss'],
})
export class ToggleShowcaseComponent {
  exampleHtml: string = require('../../examples/toggle-example/toggle-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'checked',
      description: 'If true, the toggle is selected.',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the button should use from the theme palette.',
      defaultValue: 'primary',
      inputValues: ['primary', 'secondary'],
    },
  ];
}
