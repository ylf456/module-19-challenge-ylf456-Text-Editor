// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database.js';
import { header } from './header';
// "code-mirror-themes": "^1.0.0",
export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
  
    /*
    getDb().then((data) => {
      
      console.log("data:\n")
      console.log(data);
      console.log("\nlocalData\n");
      console.log(localData);
  
     let mappedData = data.map((item) => item = item.content).join("\n")

      console.log("\nmappedData\n")
      console.log("---------------")
      console.log(mappedData);
      return mappedData;
    }).then((mappedData) =>{
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(mappedData || localData || header);
    }
    );
*/
    getDb().then((data) => {
     // console.log('editor.js Data')
     // console.log('------------------')
     // console.log(data);
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });


    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
