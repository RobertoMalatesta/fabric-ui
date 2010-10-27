(function($){
  setupFabricUi = function(options) {
    var canvas = new fabric.Element(options.canvas);
    var fabricUi = new FabricUi(canvas);

    fabricUi.setColor(options.color);
    fabricUi.setLineWidth(options.lineWidth);

    return fabricUi;
  }

  createButtons = function(obj, fabricUi) {
    $.each(fabricUi.tools, function(index, value) {
      var button = $('<button name="'+value+'"></button>');
      button.addClass('fabric-ui-button');
      button.click(function() {
        fabricUi.changeTool(this.name);
      });
      obj.append(button);
    });
  }

  createColorSelector = function(obj, fabricUi) {
    var color = $('<div></div>');
    color.addClass('fabric-ui-colorselector');
    color.css('backgroundColor', fabricUi.getColor());

    color.ColorPicker({
      color: fabricUi.getColor(),
      onShow: function (c) {
        $(c).fadeIn(500);
        return false;
      },
      onHide: function (c) {
        $(c).fadeOut(500);
        return false;
      },
      onChange: function (hsb, hex, rgb) {
        var c = '#' + hex;
        color.css('backgroundColor', c);
        fabricUi.setColor(c);
      }
    });

    obj.append(color);
  }

  $.fn.extend({
    fabricUi: function(options) {

      var defaults = {
        canvas: 'canvas',
        color: '#123456',
        lineWidth: 5
      };

      var options = $.extend(defaults, options);

      return this.each(function () {
        var self = $(this);

        var fabricUi = setupFabricUi(options);

        self.append('<h2>fabric-ui</h2>');

        createButtons(self, fabricUi);

        createColorSelector(self, fabricUi);

      });
    }
  });
})(jQuery);
