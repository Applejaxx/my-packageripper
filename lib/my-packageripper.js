'use babel';

import MyPackageripperView from './my-packageripper-view';
import { CompositeDisposable } from 'atom';

export default {

  myPackageripperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackageripperView = new MyPackageripperView(state.myPackageripperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageripperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-packageripper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackageripperView.destroy();
  },

  serialize() {
    return {
      myPackageripperViewState: this.myPackageripperView.serialize()
    };
  },

  toggle() {
    console.log('MyPackageripper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
