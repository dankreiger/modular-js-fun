var element = {
  currentSelectVal: null,
  container: null,
  bootstrap4: function() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
    document.head.appendChild(link);
  },
  create: function(elementType, content) {
    var node = document.createElement(elementType),
      elNode = document.createTextNode(content);

    node.appendChild(elNode);
    this.render(node);
  },
  remove: function(elementType) {
    var node = document.querySelector(elementType);
    if (node) {
      this.container.removeChild(node);
    };
  },
  render: function(node) {
    if(this.container){
      this.container.appendChild(node);
    } else {
      document.body.appendChild(node);
    }
  },
  handleInput: function(e) {
    var selectNode = document.querySelector('select'),
        currentOption = selectNode.options[selectNode.selectedIndex].value;

    var text = e.target.value;
    element.remove(currentOption);
    element.create(currentOption, text);
  },
  handleSelectFocus: function(e) {
    this.currentSelectVal = e.target.value;
  },
  handleSelectChange: function(e) {
    var selectedEl = e.target.value,
        oldEl = document.querySelector(this.currentSelectVal);
    element.remove(this.currentSelectVal);
    element.create(selectedEl, oldEl ? oldEl.innerText : '');
  },
  init: function() {
    var container = document.createElement("DIV"),
        input = document.createElement("INPUT"),
        select = document.createElement("SELECT"),
        css = 'select { display: block; margin-bottom: 2rem;} .container > * + * + * {word-wrap: break-word; width: 100%;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        options = ["h1","h2", "h3", "h4", "h5", "h6", "p", "code"];

    this.bootstrap4();

    container.className += "container";
    input.className += "form-control";
    select.className += "form-control";

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }

    input.addEventListener('input', this.handleInput, false);
    select.addEventListener('focus', this.handleSelectFocus, false);
    select.addEventListener('click', this.handleSelectFocus, false);
    select.addEventListener('change', this.handleSelectChange, false);


    this.render(container);
    this.container = document.querySelector('.container');

    this.render(input);
    this.render(select);
  }
}

// alternative to DOMContentLoaded
document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    element.init();
  }
}
