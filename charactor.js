function char(sprite, start, speed, diff, el, className, stopCallback) {
    this.sprite = sprite;
    this.speed = speed;
    this.start = start;
    this.diff = diff;
    this.state = 1;
    this.elName = el;
    this.elClass = className;
    this.stopCallback = stopCallback;
    this.life = diff;

    this.currentX = start;

    function state_Walking(ch) {

        this.animateSpeed = ch.sprite.walkingSpeed;

        this.char = ch;
        this.state = 0;
        var _self = this;
        this.attackOnce = false;

        this.states = ch.sprite.walking;
        this.stateCount = ch.sprite.walking.length;

        function animate() {
            var ch = _self.char;
            var en1X = ch.currentX;
            var state = _self.state;

            var el = ch.el;

            var pos = _self.states[state];

            var style = { 'background-position': pos.x + ' ' + pos.y };
            el.css(style);

            state = state + 1;
            if (state >= _self.stateCount) {
                state = 0;
            }

            _self.state = state;

            if (ch.speed != 0) {
                en1X = en1X - ch.speed;
                el.css('left', en1X + 'px');
            }

            if (en1X <= 150 && ch.speed != 0) {
                ch.changeState(2); //attacking
            }
            ch.currentX = en1X;
        }

        return { animate: animate, animateSpeed: this.animateSpeed }
    }

    function state_Attacking(ch) {

        this.animateSpeed = ch.sprite.attackingSpeed;

        this.char = ch;
        this.state = 0;
        this.hasAttacked = false;
        var _self = this;

        this.states = ch.sprite.attacking;
        this.stateCount = ch.sprite.attacking.length;

        function animate() {
            var ch = _self.char;
            var state = _self.state;
            var el = ch.el;

            if (_self.hasAttacked === false) {
                _self.hasAttacked = true;
                if (ch.stopCallback != null) {
                    ch.stopCallback(ch);
                }
            }

            var pos = _self.states[state];

            if (pos == undefined) { console.log(state); }
            var style = { 'background-position': pos.x + ' ' + pos.y };
            el.css(style);

            state = state + 1;
            if (state >= _self.stateCount) {
                state = 0;
            }

            _self.state = state;
        }

        return { animate: animate, animateSpeed: this.animateSpeed }
    }

    function state_Strike(ch) {

        this.animateSpeed = ch.sprite.attackingSpeed;

        this.char = ch;
        this.state = 0;
        this.hasAttacked = false;
        var _self = this;

        this.states = ch.sprite.attacking;
        this.stateCount = ch.sprite.attacking.length;

        function animate() {
            var ch = _self.char;
            var state = _self.state;
            var el = ch.el;

            var pos = _self.states[state];

            var style = { 'background-position': pos.x + ' ' + pos.y };
            el.css(style);

            if (_self.hasAttacked == true) { return; }

            state = state + 1;
            if (state >= _self.stateCount) {
                state = 0;
                _self.hasAttacked = true;
                ch.changeState(1);
            }
            _self.state = state;
        }

        return { animate: animate, animateSpeed: this.animateSpeed }
    }


    function state_Dead(ch) {

        this.animateSpeed = ch.sprite.walkingSpeed;

        this.char = ch;
        var _self = this;
        this.state = 0;

        this.states = ch.sprite.dying;
        this.stateCount = ch.sprite.dying.length;
        this.finishedDying = false;

        function animate() {

            var ch = _self.char;
            var en1X = ch.currentX;
            var state = _self.state;

            var el = ch.el;
            
            if (ch.speed != 0) {
                en1X = en1X - ch.speed;
                el.css('left', en1X + 'px');
                ch.currentX = en1X;

            }

            if (_self.finishedDying == true) { return; }

            var pos = _self.states[state];

            var style = { 'background-position': pos.x + ' ' + pos.y };
            el.css(style);

            state = state + 1;
            if (state >= _self.stateCount) {
                state = _self.stateCount - 1;
                _self.finishedDying = true;
            }

            _self.state = state;

        }

        return { animate: animate, animateSpeed: this.animateSpeed }

    }

    var _self = this;

    var _stateWalk = new state_Walking(_self);
    var _stateAttack = new state_Attacking(_self);
    var _stateDead = new state_Dead(_self);
    

    this.init = function () {

        $('div#bg').append('<div id="' + _self.elName + '" class="' + _self.elClass + '"></div>');
        var el = $('div#' + _self.elName);

        el.css({
            'background-image': 'url(' + sprite.image + ')',
            'left': _self.start + 'px'
        });

        _self.el = el;

        _self.currentState = _stateWalk;

    }

    this.start = function () {
        _self.scroll();
    }

    this.changeState = function (state) {
        switch (state) {
            case 1: { _self.currentState = _stateWalk; break; }
            case 2: { _self.currentState = _stateAttack; break; }
            case 3: { _self.currentState = _stateDead; break; }
            case 4: { _self.currentState = new state_Strike(_self); break; }
        }
    }

    this.scroll = function () {
     
        _self.currentState.animate();
        setTimeout(_self.scroll, _self.currentState.animateSpeed);
    }

    this.kill = function () {
        _self.currentState = _stateDead;
    }

    this.attack = function () {
        _self.currentState = _stateAttack;
    }

    this.strike = function () {
        
        _self.currentState = new state_Strike(_self);

    }

    this.walk = function () {
        _self.currentState = _stateWalk;
    }

    this.hit = function () {
        var life = _self.life - 1;

        if (life <= 0) { _self.kill(); }

        _self.life = life;
    }

}
