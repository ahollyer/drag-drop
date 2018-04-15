/****************************************************
  Make elements draggable
****************************************************/
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the images within the area of the their parental div (#game-box)
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('span');

      textEl && (textEl.textContent = 'moved a distance of ');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  /****************************************************
    Allow alike animals to be combined
  ****************************************************/
  interact('.giraffe').dropzone({
    // only accept elements matching this CSS selector
    accept: '.giraffe',
    // Require a 20% element overlap for a drop to be possible
    overlap: 0.2,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      console.log('Touched!!')
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      console.log('dragenter!')
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;

      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
      draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function (event) {
      console.log('dragleave!')
      // remove the drop feedback style
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
      event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function (event) {
      console.log('dropped')
      event.relatedTarget.textContent = 'Dropped';
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });
