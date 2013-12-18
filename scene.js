function scene(sprite, speed) {

    this.speed = speed;
    this.currentX = 0;

    var _self = this;

    this.init = function () {
        var el = $('div#bg');
        el.css('background-image', 'url(' + sprite + ')');
        el.css('background-position', '0px 0px');
        _self.el = el;
    }

    this.start = function () {
        _self.scroll();
    }

    this.scroll = function () {
        var curX = _self.currentX - _self.speed;
        _self.el.css('background-position-x', curX + 'px');
        _self.currentX = curX;
        setTimeout(_self.scroll, 100);
    }
}
