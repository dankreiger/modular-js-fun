var element = {
  bootstrap4: function() {
    if (!document.getElementById('bs4')) {
      var link = document.createElement('link');
      link.id = 'bs4';
      link.rel = 'stylesheet';
      link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css';
      document.head.appendChild(link);
    }
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
      document.body.removeChild(node);
    };
  },
  render: function(node) {
    document.body.appendChild(node);
  },
  h1: function(content) {
    this.remove("H1");
    this.create("H1", content);
  },
  h2: function(content) {
    this.remove("H2");
    this.create("H2", content);
  },
  handleInputChange: function(e) {
    var selectNode = document.getElementById('elementsList'),
        currentOption = selectNode.options[selectNode.selectedIndex].value;

    var text = e.target.value;
    element[currentOption](text);
  },
  init: function() {
    var input = document.createElement("INPUT"),
        select = document.createElement("SELECT")
        options = ["h1","h2"];

    select.id = 'elementsList';

    this.bootstrap4();

    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        select.appendChild(option);
    }

    input.className += "form-control";
    select.className += "form-control";
    input.addEventListener('input', this.handleInputChange, false);
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
