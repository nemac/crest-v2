//default map template
import nav_template from '../templates/nav_bar.html'
import { Component } from './components';

/**
 * nav_bar Component
 * Render and control map layer control
 */
export class nav_bar extends Component {
  constructor (placeholderId, props) {
    super(placeholderId, props, nav_template);

  }
}
