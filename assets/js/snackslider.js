/**
 * @overview Simple image slider Class
 * last modified : 2019.04.11
 * @author Seungho.Yi <rh22sh@gmail.com>
 * @package SnackSlider
 * @license MIT
 * @see https://github.com/rheesh/SnackSlider
 */

class SnackSlider{

    constructor(options){
        const opt = {
            mode: 'right',
            speed: 1000,
            pause: 4000,
            fit: 'cover',
            width: 0,
            height: 0,
            background: 'black',
            children: [],
        };
        let {selector, mode, speed, pause, width, height, fit, background, children} = Object.assign( opt, options);
        this.flag = 0;
        this.selector = selector;
        this._mode = mode;
        this._speed = speed;
        this._pause = pause;
        this._fit = fit;
        this.background = background;
        this._width = width;
        this._height = height;
        this._current = 0;
        this.wrapper = $(selector);
        this.viewport = null;
        this.image = [ null, null ];
        this.children = Array.from(children);
        this._preloadingAll();
        this.build();
        this.play = this.play.bind(this);
        this.setNextCss = this.setNextCss.bind(this);
        this.worker = null;
    }

    _preloading(url){
        let img = new Image();
        img.src = url;
    }

    _preloadingAll(){
        for(let img of this.children){
            this._preloading(img);
        }
    }

    get length(){
        return this.children.length;
    }

    get mode(){
        return this._mode;
    }
    set mode(value){
        this._mode = value;
        this.setNextCss();
    }

    get fit(){
        return this._fit;
    }
    set fit(value){
        this._fit = value;
        this.viewport.children('img').css('object-fit', this.fit);
    }

    get speed(){
        return this._speed;
    }
    set speed(value){
        this._speed = value;
        this.resetInterval();
    }

    get pause(){
        return this._pause;
    }
    set pause(value){
        this._pause = value;
        this.resetInterval();
    }

    get(idx){
        return this.children[idx];
    }
    set(idx, url){
        this.children[idx] = url;
        this._preloading(url);
    }

    add(idx, url){
        this.children.push(url);
        this._preloading(url);
    }
    insert(idx, url){
        this.children.splice(idx, 0, url);
        this._preloading(url);
    }
    delete(idx){
        this.children.splice(idx, 1);
    }

    get current(){
        if(this._current >= this.length)
            this._current = 0;
        const child = this.children[this._current];
        this._current++;
        if(this._current >= this.length)
            this._current = 0;
        return child;
    }

    get width(){
        if(this._width === 0){
            return this.wrapper.width();
        }
        return this._width;
    }
    set width(value){
        this._width = value;
        this.viewport.css('width', this.width);
        this.viewport.children('img').css('width', this.width);
    }

    get height(){
        if(this._height === 0){
            return this.wrapper.height();
        }
        return this._height;
    }
    set height(value){
        this._height = value;
        this.viewport.css('height', this.height);
        this.viewport.children('img').css('height', this.height);
    }

    get transformValue(){
        switch(this.mode){
            case 'right':
                return "translateX(-" + this.width + "px)";
            case 'left':
                return "translateX(" + this.width + "px)";
            case 'top':
                return "translateY(" + this.height + "px)";
            case 'bottom':
                return "translateY(-" + this.height + "px)";
            default:
                return "";
        }
    }

    killTranslation(i){
        this.image[i].addClass('notransition');
        this.image[i].css({transition: 'none', transform: '',});
        let res = this.image[i].get(0).offsetHeight;
        this.image[i].removeClass('notransition');
        return res;
    }

    resetInterval(){
        clearInterval(this.worker);
        this.worker = setInterval(this.play, this.speed + this.pause);
    }

    setNextCss(){
        let { mode, flag, image} = this;
        let {top, left} = this.wrapper.offset();
        switch(mode){
            case 'right':
                image[1-flag].offset({
                    top: top,
                    left: left + this.width
                });
                break;
            case 'left':
                image[1-flag].offset({
                    top: top,
                    left: left-this.width
                });
                break;
            case 'top':
                image[1-flag].offset({
                    top: top-this.height,
                    left: left
                });
                break;
            case 'bottom':
                image[1-flag].offset({
                    top: top+this.height,
                    left: left
                });
                break;
            default:
                image[1-flag].css({
                    top: 0,
                    left: 0,
                    opacity: 0.0
                });
        }
    }

    build(){
        let viewport = '<div class="slider-viewport" ></div>';
        let image = [
            '<img class="slide0 snackslide" />',
            '<img class="slide1 snackslide" />',
        ];
        this.wrapper.append(viewport);
        this.viewport = this.wrapper.children('.slider-viewport');
        this.viewport.css({
            width: this.width,
            height: this.height,
        });
        this.viewport.append(image);
        this.image = [ this.viewport.children('.slide0'), this.viewport.children('.slide1') ];
        for(let i=0; i<2; i++){
            this.image[i].css({
                top: 0,
                left: 0,
                width: this.width,
                height: this.height,
                objectFit: this.fit,
                backgroundColor: this.background,
                transition: '',
                transform: '',
                zIndex: 10-i,
            });
            this.image[i].attr("src", this.current);
        }
        this.setNextCss();
    }

    play(){
        let obj = this;
        let { length, image, flag, speed } = obj;

        function fn(){
            obj.image[flag].css({top:0, left:0, opacity: 1.0, transition: '', transform: ''});
            obj.image[1-flag].attr("src", obj.current);
            obj.setNextCss();
        }

        if(length === 0) return;
        image[flag].css('z-index', 9);
        flag = 1 - flag;
        this.flag = flag;
        if(this.mode === 'fade'){
            image[flag].css('z-index', 10)
                .animate({top:0, left:0, opacity: 1.0}, speed, fn);
        }else{
            image[flag].css({
                zIndex : 10,
                transition: "transform " + this.speed/1000 + "s ease",
                transform: this.transformValue,
            }).one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', fn);
        }
    }

    start(){
        if(this.length === 0) return;
        this.worker = setInterval(this.play, this.speed + this.pause);
    }

    distroy(){
        clearInterval(this.worker);
        this.killTranslation(0);
        this.killTranslation(1);
    }

    stop(){
        this.distroy();
    }
}
