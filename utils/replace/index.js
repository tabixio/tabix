const fs = require('fs');
const replaceAll = require('replaceall');

class Jsp {
    constructor({ entry, output }) {
        this.output = output;

        this.text = fs.readFileSync(entry,{ 
            encoding: 'utf8'
        });
    }

    replace(pattern, value) {
        if (typeof pattern === 'string') {
            this.text = replaceAll(pattern, value, this.text);
        }
        else {
            this.text = this.text.replace(pattern, value);
        }
        
        return this;
    }

    save() {
        fs.writeFileSync(this.output, this.text, {
            encoding: 'utf8'
        });
    }
}
  
module.exports = Jsp;